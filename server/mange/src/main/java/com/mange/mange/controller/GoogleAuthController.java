package com.mange.mange.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mange.mange.service.GoogleAuthService;
import com.mange.mange.dto.UserDTO;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.security.GeneralSecurityException;

@RestController
@RequestMapping("/api/auth")
public class GoogleAuthController {

    private static final Logger logger = LoggerFactory.getLogger(GoogleAuthController.class);

    @Autowired
    private GoogleAuthService googleAuthService;

    @Value("${frontend.url}")
    private String frontendUrl;

    @GetMapping("/google")
    public String getGoogleAuthUrl() {
        return googleAuthService.getGoogleAuthUrl();
    }

    @GetMapping("/profile")
    public ResponseEntity<?> handleCallback(@RequestParam String code, HttpServletResponse response) {
        try {
            logger.info("Received callback with code: {}", code);
            String idToken = googleAuthService.getTokens(code);
            logger.info("Retrieved ID token");
            UserDTO user = googleAuthService.decodeIdToken(idToken);
            logger.info("Decoded user information: {}", user);

            if (user.isEmailVerified()) {
                if (googleAuthService.isUserRegistered(user.getEmail())) {
                    addCookie(response, "user_token", idToken, 30 * 60); // 30 minutes
                    logger.info("User authenticated successfully");
                    String redirectUrl = frontendUrl + "/oauth/callback?token=" + idToken;
                    return ResponseEntity.status(302).header("Location", redirectUrl).build();
                } else {
                    addCookie(response, "No_User", "true", 30);
                    logger.info("User not registered");
                    return ResponseEntity.status(302).header("Location", frontendUrl + "/login").build();
                }
            } else {
                addCookie(response, "No_Verified_Gmail", "true", 3);
                logger.warn("Email not verified for user: {}", user.getEmail());
                return ResponseEntity.status(302).header("Location", frontendUrl + "/error?reason=emailNotVerified").build();
            }
        } catch (IOException | GeneralSecurityException e) {
            logger.error("Authentication failed", e);
            return ResponseEntity.status(302).header("Location", frontendUrl + "/error?reason=authenticationFailed").build();
        }
    }

    private void addCookie(HttpServletResponse response, String name, String value, int maxAgeInSeconds) {
        Cookie cookie = new Cookie(name, value);
        cookie.setHttpOnly(false);
        cookie.setSecure(false); // Set to true if using HTTPS
        cookie.setPath("/");
        cookie.setMaxAge(maxAgeInSeconds);
        response.addCookie(cookie);
    }

    private static class AuthResponse {
        public boolean authenticated;
        public String token;

        public AuthResponse(boolean authenticated, String token) {
            this.authenticated = authenticated;
            this.token = token;
        }
    }
}