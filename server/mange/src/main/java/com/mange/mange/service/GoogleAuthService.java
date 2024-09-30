package com.mange.mange.service;

import com.mange.mange.dto.UserDTO;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class GoogleAuthService {

    private static final Logger logger = LoggerFactory.getLogger(GoogleAuthService.class);

    @Value("${google.client.id}")
    private String clientId;

    @Value("${google.client.secret}")
    private String clientSecret;

    @Value("${google.redirect.uri}")
    private String redirectUri;

    private static final List<String> SCOPES = Arrays.asList(
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
            "openid");

    private GoogleAuthorizationCodeFlow flow;
    private GoogleIdTokenVerifier verifier;

    public String getGoogleAuthUrl() {
        if (flow == null) {
            logger.info("Initializing GoogleAuthorizationCodeFlow");
            GoogleClientSecrets clientSecrets = new GoogleClientSecrets()
                    .setWeb(new GoogleClientSecrets.Details()
                            .setClientId(clientId)
                            .setClientSecret(clientSecret));

            flow = new GoogleAuthorizationCodeFlow.Builder(
                    new NetHttpTransport(),
                    JacksonFactory.getDefaultInstance(),
                    clientSecrets,
                    SCOPES)
                    .setAccessType("offline")
                    .build();

            verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), JacksonFactory.getDefaultInstance())
                    .setAudience(Collections.singletonList(clientId))
                    .build();
        }

        String authUrl = flow.newAuthorizationUrl().setRedirectUri(redirectUri).build();
        logger.info("Generated Google Auth URL: {}", authUrl);
        return authUrl;
    }

    public String getTokens(String code) throws IOException {
        logger.info("Exchanging code for tokens");
        GoogleTokenResponse tokenResponse = flow.newTokenRequest(code).setRedirectUri(redirectUri).execute();
        logger.info("Received token response");
        return tokenResponse.getIdToken();
    }

    public UserDTO decodeIdToken(String idTokenString) throws GeneralSecurityException, IOException {
        try {
            logger.info("Verifying ID token");
            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();

                UserDTO user = new UserDTO();
                user.setId(payload.getSubject());
                user.setEmail(payload.getEmail());
                user.setName((String) payload.get("name"));
                user.setEmailVerified(payload.getEmailVerified());

                logger.info("Decoded user information: {}", user);
                return user;
            } else {
                logger.error("Invalid ID token");
                throw new RuntimeException("Invalid ID token");
            }
        } catch (Exception e) {
            logger.error("Failed to decode ID token", e);
            throw new RuntimeException("Failed to decode ID token", e);
        }
    }

    public boolean isUserRegistered(String email) {
        // TODO: Implement actual database check
        logger.info("Checking if user is registered: {}", email);
        return true;
    }
}