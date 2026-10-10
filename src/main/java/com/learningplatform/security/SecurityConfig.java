
package com.learningplatform.security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
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
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth

                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // Public authentication endpoints
                .requestMatchers("/api/auth/**", "/notes/**").permitAll()

                // Public read-only learning content
                .requestMatchers(HttpMethod.GET,
                    "/api/subjects", "/api/subjects/**",
                    "/api/chapters", "/api/chapters/**",
                    "/api/materials", "/api/materials/**"
                ).permitAll()

                // Quiz access requires authentication
                .requestMatchers(HttpMethod.POST,
                    "/api/quizzes/*/submit"
                ).hasAnyRole("STUDENT", "ADMIN")

                .requestMatchers(HttpMethod.GET,
                    "/api/quizzes", "/api/quizzes/**"
                ).hasAnyRole("STUDENT", "ADMIN")

                .requestMatchers(HttpMethod.POST, "/api/quizzes/**")
                    .hasRole("ADMIN")

                .requestMatchers(HttpMethod.PUT, "/api/quizzes/**")
                    .hasRole("ADMIN")

                .requestMatchers(HttpMethod.DELETE, "/api/quizzes/**")
                    .hasRole("ADMIN")

                // Only admins can manage subjects
                .requestMatchers(HttpMethod.POST, "/api/subjects/**")
                    .hasRole("ADMIN")

                .requestMatchers(HttpMethod.PUT, "/api/subjects/**")
                    .hasRole("ADMIN")

                .requestMatchers(HttpMethod.DELETE, "/api/subjects/**")
                    .hasRole("ADMIN")

                // Only admins can manage chapters
                .requestMatchers(HttpMethod.POST, "/api/chapters/**")
                    .hasRole("ADMIN")

                .requestMatchers(HttpMethod.PUT, "/api/chapters/**")
                    .hasRole("ADMIN")

                .requestMatchers(HttpMethod.DELETE, "/api/chapters/**")
                    .hasRole("ADMIN")

                // Only admins can manage learning materials
                .requestMatchers(HttpMethod.POST, "/api/materials/**")
                    .hasRole("ADMIN")

                .requestMatchers(HttpMethod.PUT, "/api/materials/**")
                    .hasRole("ADMIN")

                .requestMatchers(HttpMethod.DELETE, "/api/materials/**")
                    .hasRole("ADMIN")

                // Admin and student areas
                .requestMatchers("/api/admin/**").hasRole("ADMIN")

                .requestMatchers("/api/student/**")
                    .hasAnyRole("STUDENT", "ADMIN")

                .requestMatchers(
                    "/api/recommendations/**",
                    "/api/gamification/**",
                    "/api/progress/**"
                ).hasAnyRole("STUDENT", "ADMIN")

                // Everything else requires authentication
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

        configuration.setAllowedOriginPatterns(List.of(
            "https://intelli-learn-lovat.vercel.app",
            "http://localhost:5173",
            "http://localhost:3000"
        ));

        configuration.setAllowedMethods(List.of(
            "GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"
        ));

        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
