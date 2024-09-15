// package com.mange.mange.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.web.SecurityFilterChain;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             .authorizeHttpRequests(authz -> authz
//                 .requestMatchers("/actuator/**").permitAll()  // Allow unauthenticated access to actuator endpoints
//                 .anyRequest().authenticated()  // All other requests require authentication
//             )
//             .formLogin()  // Enable form-based login
//             .and()
//             .csrf().disable();  // Disable CSRF protection (be cautious with this in production)

//         return http.build();
//     }
// }