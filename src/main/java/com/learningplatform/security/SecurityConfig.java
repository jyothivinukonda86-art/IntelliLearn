package com.learningplatform.security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(org.springframework.http.HttpMethod.OPTIONS, "/**").permitAll()
                .requestMatchers("/api/auth/**", "/notes/**").permitAll()

                .requestMatchers(org.springframework.http.HttpMethod.GET,
                        "/api/subjects", "/api/subjects/**").hasAnyRole("STUDENT", "ADMIN")

                .requestMatchers(org.springframework.http.HttpMethod.POST,
                        "/api/quizzes", "/api/quizzes/**").hasAnyRole("STUDENT", "ADMIN")

                .requestMatchers(org.springframework.http.HttpMethod.GET,
                        "/api/quizzes", "/api/quizzes/**").hasAnyRole("STUDENT", "ADMIN")

                .requestMatchers(org.springframework.http.HttpMethod.POST,
                        "/api/quizzes/*/submit").hasAnyRole("STUDENT", "ADMIN")

                .requestMatchers(org.springframework.http.HttpMethod.POST,
                        "/api/subjects", "/api/subjects/**").hasAnyRole("STUDENT", "ADMIN")

                .requestMatchers(org.springframework.http.HttpMethod.DELETE,
                        "/api/subjects/**").hasAnyRole("STUDENT", "ADMIN")

                .requestMatchers(org.springframework.http.HttpMethod.GET,
                        "/api/chapters/subject/**", "/api/chapters/**").hasAnyRole("STUDENT", "ADMIN")

                .requestMatchers(org.springframework.http.HttpMethod.POST,
                        "/api/chapters", "/api/chapters/**").hasAnyRole("STUDENT", "ADMIN")

                .requestMatchers(org.springframework.http.HttpMethod.DELETE,
                        "/api/chapters/**").hasAnyRole("STUDENT", "ADMIN")

                .requestMatchers("/api/admin/**").hasAnyRole("STUDENT", "ADMIN")
                .requestMatchers("/api/student/**").hasAnyRole("STUDENT", "ADMIN")

                .requestMatchers(org.springframework.http.HttpMethod.GET,
                        "/api/materials", "/api/materials/**").hasAnyRole("STUDENT", "ADMIN")

                .requestMatchers(org.springframework.http.HttpMethod.POST,
                        "/api/materials", "/api/materials/**").hasAnyRole("STUDENT", "ADMIN")

                .requestMatchers(org.springframework.http.HttpMethod.PUT,
                        "/api/materials", "/api/materials/**").hasAnyRole("STUDENT", "ADMIN")

                .requestMatchers(org.springframework.http.HttpMethod.DELETE,
                        "/api/materials", "/api/materials/**").hasAnyRole("STUDENT", "ADMIN")

                .requestMatchers("/api/recommendations", "/api/recommendations/**").hasAnyRole("STUDENT", "ADMIN")
                .requestMatchers("/api/gamification", "/api/gamification/**").hasAnyRole("STUDENT", "ADMIN")
                .requestMatchers("/api/progress", "/api/progress/**").hasAnyRole("STUDENT", "ADMIN")
                
                .anyRequest().authenticated()
            )
            .formLogin(form -> form.disable())
            .httpBasic(basic -> basic.disable());

        http.addFilterBefore(
                jwtFilter,
                UsernamePasswordAuthenticationFilter.class
        );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of("*"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}