package com.mange.mange.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mange.mange.service.UserService;
import com.mange.mange.service.EmailService;
import com.mange.mange.models.User;
import com.mange.mange.util.JwtUtil;
import com.mange.mange.DTO.JWT_DTO;

import jakarta.mail.MessagingException;

@RestController
@RequestMapping("/api/password")
public class PasswordResetController {

    private static final Logger logger = LoggerFactory.getLogger(PasswordResetController.class);

    private final UserService userService;
    private final EmailService emailService;
    private final JwtUtil jwtUtil;

    @Value("${app.password-reset.url}")
    private String passwordResetBaseUrl;

    @Autowired
    public PasswordResetController(UserService userService, EmailService emailService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.emailService = emailService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/reset-request")
    public ResponseEntity<String> requestPasswordReset(@RequestBody JWT_DTO jwtDto) {
        logger.info("Password reset request received for email: {}", jwtDto.getEmail());
        try {
            String email = jwtDto.getEmail();
            User user = userService.getUserByEmail(jwtDto.getEmail());
            logger.info("User found for email: {}", jwtDto.getEmail());

            if(user.getValid()) {
                logger.info("User is validated. Proceeding with password reset for email: {}", email);

                // Generate JWT
                String token = jwtUtil.generateToken(user.getEmail(), user.getPassword());
                logger.debug("JWT token generated for email: {}", email);

                // Create password reset link
                String resetLink = passwordResetBaseUrl + "?password=" + token;
                logger.debug("Reset link created: {}", resetLink);

                // Prepare email content
                String emailSubject = "Password Reset Request";
                String emailBody = "<!DOCTYPE html>"
                        + "<html>"
                        + "<head>"
                        + "<style>"
                        + "body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }"
                        + ".container { max-width: 600px; margin: 0 auto; padding: 20px; }"
                        + "h1 { color: #2c3e50; }"
                        + ".button { display: inline-block; padding: 10px 20px; background-color: #3498db; color: #ffffff; text-decoration: none; border-radius: 5px; }"
                        + "</style>"
                        + "</head>"
                        + "<body>"
                        + "<div class='container'>"
                        + "<h1>Password Reset Request</h1>"
                        + "<p>Dear " + user.getEmail() + ",</p>"
                        + "<p>We received a request to reset your password.</p>"
                        + "<p>Please click on the following button to reset your password:</p>"
                        + "<p><a href='" + resetLink + "' class='button'>Reset Password</a></p>"
                        + "<p>Or copy and paste this link into your browser:</p>"
                        + "<p>" + resetLink + "</p>"
                        + "<p>This link will expire in 1 hour.</p>"
                        + "<p>If you did not request a password reset, please ignore this email.</p>"
                        + "<p>Best regards,<br>Your Service Team</p>"
                        + "</div>"
                        + "</body>"
                        + "</html>";

                // Send password reset email
                emailService.sendEmail(user.getEmail(), emailSubject, emailBody);
                logger.info("Password reset email sent to: {}", jwtDto.getEmail());

                return ResponseEntity.status(200).body(jwtDto.getEmail());
            } else {
                logger.warn("User is not validated. Password reset request denied for email: {}", jwtDto.getEmail());
                return ResponseEntity.status(401).body("User is not validated, contact support for new validation link");
            }
        } catch (RuntimeException e) {
            logger.error("User not found for email: {}", jwtDto.getEmail(), e);
            return ResponseEntity.badRequest().body("User not found.");
        } catch (MessagingException e) {
            logger.error("Failed to send password reset email to: {}", jwtDto.getEmail(), e);
            return ResponseEntity.internalServerError().body("Failed to send password reset email.");
        }
    }

    @PostMapping("/reset")
    public ResponseEntity<String> resetPassword(@RequestBody JWT_DTO jwtDto) {
        logger.info("Password reset attempt for email: {}", jwtDto.getEmail());
        try {
            // Extract email and new password from JWT_DTO
            String newPassword = jwtDto.getPassword();

            logger.info("User found for password reset: {}", jwtDto.getEmail());
            logger.info("User found for password reset: {}", jwtDto.getEmail());
            // Find user by email
            User user = userService.getUserByEmail(jwtDto.getEmail());

            // Update user's password
            user.setPassword(newPassword); // Assuming the User model has a setPassword method
            logger.debug("New password set for user: {}", jwtDto.getEmail());

            // Save the updated user
            userService.updateUser(user);
            logger.info("Password successfully reset for user: {}", jwtDto.getEmail());

            return ResponseEntity.status(200).body("Password has been successfully reset.");
        } catch (RuntimeException e) {
            logger.error("Failed to reset password. User not found: {}", jwtDto.getEmail(), e);
            return ResponseEntity.badRequest().body("Failed to reset password. User not found.");
        } catch (Exception e) {
            logger.error("An error occurred while resetting the password for user: {}", jwtDto.getEmail(), e);
            return ResponseEntity.internalServerError().body("An error occurred while resetting the password.");
        }
    }
}