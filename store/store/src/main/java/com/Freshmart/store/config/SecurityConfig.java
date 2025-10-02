package com.Freshmart.store.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

// --- ADD THESE IMPORTS ---
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;
// -------------------------


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // --- ADD THIS LINE TO APPLY THE CORS CONFIGURATION ---
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()));
        // ----------------------------------------------------

        // Your existing configuration
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll()
            )
            .httpBasic(httpBasic -> {})
            .formLogin(form -> form.disable());
        return http.build();
    }

    // --- ADD THIS ENTIRE BEAN METHOD ---
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // This is the origin of your frontend application
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        // Specify the allowed HTTP methods
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        // Allow all headers
        configuration.setAllowedHeaders(Arrays.asList("*"));
        // Allow credentials (e.g., cookies) to be sent
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Apply this configuration to all paths in your application
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
    // ------------------------------------
}