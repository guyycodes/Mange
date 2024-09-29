// ChatRequest.java
package com.mange.mange.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Role: Data Transfer Object (DTO)
 * This class defines the structure of incoming chat requests from users.
 * It includes validation to ensure the message is not blank and doesn't exceed a certain length.
 */
public class ChatRequest {
    @NotBlank(message = "Message cannot be empty")
    @Size(max = 1000, message = "Message cannot exceed 1000 characters")
    private String message;

    // Getter and setter
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}