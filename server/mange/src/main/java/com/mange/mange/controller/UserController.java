package com.mange.mange.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mange.mange.DTO.NewUserDTO;
import com.mange.mange.DTO.JWT_DTO;
import com.mange.mange.exceptions.UserAlreadyExistsException;
import com.mange.mange.exceptions.UserNotFoundException;
import com.mange.mange.models.User;
import com.mange.mange.service.EmailService;
import com.mange.mange.service.UserService;
import com.mange.mange.util.JwtUtil;

import jakarta.mail.MessagingException;

/*
Role: API Endpoint
This controller handles HTTP requests related to user management.
It defines endpoints for creating, retrieving, updating, and deleting users.
It uses the UserService to interact with the user data and the EmailService to send confirmation emails.
 */

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final EmailService emailService;
    private final JwtUtil jwtUtil;

    @Autowired
    private final UserService userService;

    @Value("${app.verification.url}")
    private String verificationBaseUrl;

    @Autowired
    public UserController(UserService userService, EmailService emailService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.emailService = emailService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createUser(@RequestBody NewUserDTO newUserDTO) {
        try {
            System.out.println("Starting user creation process for: " + newUserDTO.getEmail());
            
            User createdUser = userService.createUser(newUserDTO);
            System.out.println("User created successfully in the database");
    
            // Generate JWT
            String token = jwtUtil.generateToken(newUserDTO.getEmail(), newUserDTO.getPassword());
            System.out.println("JWT generated successfully");
    
            // Create verification link
            String verificationLink = verificationBaseUrl + "?token=" + token;
    
            // Prepare email content
            String emailSubject = "Welcome to Our Service - Verify Your Account";
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
                             + "<h1>Welcome to Our Service!</h1>"
                             + "<p>Dear " + newUserDTO.getEmail() + ",</p>"
                             + "<p>Your account has been successfully created.</p>"
                             + "<p>Please click on the following button to verify your account:</p>"
                             + "<p><a href='" + verificationLink + "' class='button'>Verify Your Account</a></p>"
                             + "<p>Or copy and paste this link into your browser:</p>"
                             + "<p>" + verificationLink + "</p>"
                             + "<p>This link will expire in 24 hours.</p>"
                             + "<p>Best regards,<br>Your Service Team</p>"
                             + "</div>"
                             + "</body>"
                             + "</html>";
    
            // Send confirmation email
            emailService.sendEmail(createdUser.getEmail(), emailSubject, emailBody);
    
            return ResponseEntity.status(200).body("User created successfully. Please check your email to verify your account.");
        } catch (UserAlreadyExistsException e) {
            System.err.println("User already exists: " + e.getMessage());
            return ResponseEntity.status(409).body("User already exists");
        } catch (MessagingException e) {
            System.err.println("Failed to send confirmation email: " + e.getMessage());
            return ResponseEntity.status(200).body("User created successfully, but failed to send confirmation email");
        } catch (Exception e) {
            System.err.println("Unexpected error occurred: " + e.getMessage());
            return ResponseEntity.status(500).body("An error occurred while creating the user: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody JWT_DTO jwtDto) {
        if (jwtUtil.checkTokenValidity(jwtDto)) {
            System.out.println("Login successful for email: " + jwtDto.getEmail());
            System.out.println("Password: " + jwtDto.getPassword());

            // updates the 'valid' field on the user
            boolean isValid = userService.validateUserAndUpdateStatus(jwtDto.getEmail(), jwtDto.getPassword());

            if (isValid) {
                System.out.println("User validated successfully");
                String token = jwtUtil.generateToken(jwtDto);
                return ResponseEntity.status(200).body(token);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }
        } else {
            // attempt to authenticate with email and password
            boolean isAuthenticated = userService.authenticateUser(jwtDto.getEmail(), jwtDto.getPassword());

            if (isAuthenticated) {
                jwtDto.setValid(true);
                String token = jwtUtil.generateToken(jwtDto);
                return ResponseEntity.status(200).body(token);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }
        }
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        try {
            User user = userService.getUserById(id);
            return ResponseEntity.ok(user);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User user) {
        user.setId(id);
        try {
            User updatedUser = userService.updateUser(user);
            return ResponseEntity.ok(updatedUser);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok("User deleted successfully");
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}