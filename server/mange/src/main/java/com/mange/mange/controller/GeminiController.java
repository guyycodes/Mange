// GeminiController.java
package com.mange.mange.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.annotation.Validated;
import org.springframework.http.ResponseEntity;
import com.mange.mange.service.GeminiService;
import com.mange.mange.model.ChatRequest;
import com.mange.mange.model.ChatResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
/*
Role: API Endpoint
This controller handles HTTP requests related to the Gemini chat functionality.
It defines the /chat endpoint that accepts ChatRequest objects and returns ChatResponse objects.
It uses the GeminiService to process chat messages and handle any errors.
 */
@RestController
@RequestMapping("/api/gemini")
@CrossOrigin(origins = "*")
public class GeminiController {

    private static final Logger logger = LoggerFactory.getLogger(GeminiController.class);

    private final GeminiService geminiService;

    @Autowired
    public GeminiController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> chat(@Validated @RequestBody ChatRequest chatRequest) {
        logger.info("Received chat request: {}", chatRequest.getMessage());
        try {
            String response = geminiService.chat(chatRequest.getMessage());
            logger.info("Sent chat response: {}", response);
            return ResponseEntity.ok(new ChatResponse(response));
        } catch (Exception e) {
            logger.error("Error while processing chat request", e);
            return ResponseEntity.status(500).body(new ChatResponse("Error processing request"));
        }
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        logger.info("Test endpoint called");
        return ResponseEntity.ok("Test endpoint working");
    }
}