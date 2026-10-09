package com.learningplatform.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.learningplatform.entity.Role;
import com.learningplatform.entity.User;
import com.learningplatform.repository.UserRepository;

@Configuration
public class AdminInitializer {

    @Bean
    CommandLineRunner createAdmin(UserRepository userRepository,
                                  PasswordEncoder passwordEncoder) {

        return args -> {

            if (userRepository.findByEmail("admin@learning.com").isEmpty()) {

                User admin = new User();

                admin.setName("System Admin");
                admin.setEmail("admin@learning.com");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRole(Role.ADMIN);

                userRepository.save(admin);

                System.out.println("Admin account created successfully.");
            }
        };
    }
}