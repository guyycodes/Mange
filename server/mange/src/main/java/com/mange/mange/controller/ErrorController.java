package com.mange.mange.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ErrorController {

    @Value("${frontend.url}")
    private String frontendUrl;

    @RequestMapping("/error/unvalidated")
    public ResponseEntity<ErrorResponse> handleUnvalidatedUser() {
        ErrorResponse errorResponse = new ErrorResponse("403", "User Not Validated", frontendUrl + "/login");
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);
    }

    @RequestMapping("/**")
    public ResponseEntity<ErrorResponse> handleError() {
        ErrorResponse errorResponse = new ErrorResponse("404", "Not Found", frontendUrl + "/*");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }

    private static class ErrorResponse {
        private String status;
        private String message;
        private String redirectUrl;

        public ErrorResponse(String status, String message, String redirectUrl) {
            this.status = status;
            this.message = message;
            this.redirectUrl = redirectUrl;
        }

        // Getters
        public String getStatus() { return status; }
        public String getMessage() { return message; }
        public String getRedirectUrl() { return redirectUrl; }
    }
}