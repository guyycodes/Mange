package com.mange.mange.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mange.mange.exceptions.UserNotFoundException;
import com.mange.mange.models.User;
import com.mange.mange.repository.UserRepository;
import com.mange.mange.util.JwtUtil;
import com.mange.mange.DTO.JWT_DTO;

import io.jsonwebtoken.Claims;

@RestController
@RequestMapping("/api")
public class TokenValidationController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/validate-token")
    public ResponseEntity<?> validateToken(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        boolean isValid = jwtUtil.validateToken(token);

        Map<String, Object> response = new HashMap<>();
        response.put("valid", isValid);

        if (isValid) {
            Claims claims = jwtUtil.getClaimsFromToken(token);
            String email = claims.getSubject();
            Date expirationDate = claims.getExpiration();
            Date issuedAt = claims.getIssuedAt();

            // Check if the user exists in the database
            Optional<User> user = userRepository.findByEmail(email);
            if (user.isPresent()) {
                response.put("email", email);
                response.put("expirationDate", expirationDate);
                response.put("issuedAt", issuedAt);
                response.put("timeUntilExpiration", expirationDate.getTime() - new Date().getTime());
                response.put("userExists", true);
            } else {
                response.put("valid", false);
                response.put("userExists", false);
                response.put("message", "User not found in the database");
            }
        }

        return ResponseEntity.ok(response);
    }
}