// ConversationService.java
package com.mange.mange.service;

import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.memory.chat.MessageWindowChatMemory;
import dev.langchain4j.service.AiServices;
import org.springframework.stereotype.Service;

/**
 * Role: AI Service Integration
 * This service integrates with Langchain4j to create a conversational interface with the Gemini model.
 * It uses the ChatLanguageModel and MessageWindowChatMemory beans to build an AI service that can maintain conversation context.
 */
@Service
public class ConversationService {

    private final ConversationInterface conversation;

    public ConversationService(ChatLanguageModel chatModel, MessageWindowChatMemory chatMemory) {
        this.conversation = AiServices.builder(ConversationInterface.class)
                .chatLanguageModel(chatModel)
                .chatMemory(chatMemory)
                .build();
    }

    public String chat(String message) {
        return conversation.chat(message);
    }

    private interface ConversationInterface {
        String chat(String message);
    }
}