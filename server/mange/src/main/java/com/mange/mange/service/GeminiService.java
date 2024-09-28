// GeminiService.java
package com.mange.mange.service;

import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
//import com.mange.mange.config.GeminiConfig.ConversationService;

/**
 * Role: Business Logic
 * This service acts as an intermediary between the controller and the ConversationService.
 * It adds logging to track message processing and could be extended to include additional business logic or preprocessing of messages.
 */
@Service
public class GeminiService {

    private static final Logger logger = LoggerFactory.getLogger(GeminiService.class);

    private final ConversationService conversationService;

    @Autowired
    public GeminiService(ConversationService conversationService) {
        this.conversationService = conversationService;
    }

    public String chat(String message) {
        logger.info("Processing message: {}", message);
        return conversationService.chat(message);
    }
}