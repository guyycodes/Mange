package com.mange.mange.DTO;

import java.time.Instant;

public class JWT_DTO {
    private String email;
    private String password;
    private Instant issuedAt;
    private Instant expirationDate;
    private Long timeUntilExpiration;
    private Boolean userExists;
    private Boolean valid;
    private Boolean isReturningUser;

    // Default constructor
    public JWT_DTO() {}

    // Full constructor
    public JWT_DTO(String email, String password, String issuedAt, String expirationDate,
                   Long timeUntilExpiration, Boolean userExists, Boolean valid, Boolean isReturningUser) {
        this.email = email;
        this.password = password;
        this.issuedAt = Instant.parse(issuedAt);
        this.expirationDate = Instant.parse(expirationDate);
        this.timeUntilExpiration = timeUntilExpiration;
        this.userExists = userExists;
        this.valid = valid;
        this.isReturningUser = isReturningUser;
    }


    // Getters and setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Instant getIssuedAt() {
        return issuedAt;
    }

    public void setIssuedAt(Instant issuedAt) {
        this.issuedAt = issuedAt;
    }

    public Instant getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(Instant expirationDate) {
        this.expirationDate = expirationDate;
    }

    public Long getTimeUntilExpiration() {
        return timeUntilExpiration;
    }

    public void setTimeUntilExpiration(Long timeUntilExpiration) {
        this.timeUntilExpiration = timeUntilExpiration;
    }

    public Boolean getUserExists() {
        return userExists;
    }

    public void setUserExists(Boolean userExists) {
        this.userExists = userExists;
    }

    public Boolean getValid() {
        return valid;
    }

    public void setValid(Boolean valid) {
        this.valid = valid;
    }

    public Boolean getIsReturningUser() {
        return isReturningUser;
    }

    public void setIsReturningUser(Boolean isReturningUser) {
        this.isReturningUser = isReturningUser;
    }

    @Override
    public String toString() {
        return "JWT_DTO{" +
                "email='" + email + '\'' +
                ", expirationDate=" + expirationDate +
                ", issuedAt=" + issuedAt +
                ", timeUntilExpiration=" + timeUntilExpiration +
                ", userExists=" + userExists +
                ", valid=" + valid +
                ", isReturningUser=" + isReturningUser +
                '}';
    }
}