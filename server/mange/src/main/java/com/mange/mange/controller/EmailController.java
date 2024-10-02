package com.mange.mange.controller;

import com.mange.mange.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.mange.mange.DTO.ContactForm_DTO;

import jakarta.mail.MessagingException;

@RestController
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/api/contact-form")
    public ResponseEntity<String> handleContactForm(@RequestBody ContactForm_DTO request) {
        try {
            String htmlBody = String.format(
                    "<h2>New Contact Form Submission</h2>" +
                            "<p><strong>Name:</strong> %s</p>" +
                            "<p><strong>Email:</strong> %s</p>" +
                            "<p><strong>Subject:</strong> %s</p>" +
                            "<p><strong>Message:</strong></p>" +
                            "<p>%s</p>",
                    request.getName(),
                    request.getEmail(),
                    request.getSubject(),
                    request.getMessage().replace("\n", "<br>")
            );

            emailService.sendEmail("info@levelupco.com", "New Contact Form Submission: " + request.getSubject(), htmlBody);
            return ResponseEntity.ok("Email sent successfully");
        } catch (MessagingException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Failed to send email");
        }
    }
}