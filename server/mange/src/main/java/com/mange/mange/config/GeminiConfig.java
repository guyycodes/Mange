// GeminiConfig.java
package com.mange.mange.config;

import com.google.auth.oauth2.GoogleCredentials;
import dev.langchain4j.model.vertexai.VertexAiGeminiChatModel;
import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.memory.chat.MessageWindowChatMemory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
/*
This file sets up the beans necessary for interacting with the Gemini model.
It creates a ChatLanguageModel bean that configures the Vertex AI Gemini model with the correct project, location, and model parameters.
It also sets up a MessageWindowChatMemory bean for maintaining conversation context.
 */
import java.io.IOException;

@Configuration
public class GeminiConfig {

    @Value("${spring.cloud.gcp.project-id}")
    private String projectId;

    @Value("${spring.cloud.gcp.location}")
    private String location;

    @Bean
    public ChatLanguageModel geminiChatModel() {
        return VertexAiGeminiChatModel.builder()
                .project(projectId)
                .location(location)
                .modelName("gemini-1.5-flash-001") // or the appropriate model name
                .temperature(0.7f)
                .maxOutputTokens(2048)
                .topK(40)
                .topP(0.95f)
                .build();
    }

    @Bean
    public MessageWindowChatMemory chatMemory() {
        return MessageWindowChatMemory.builder()
                .maxMessages(20)
                .build();
    }
}
