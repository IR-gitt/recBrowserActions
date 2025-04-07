package com.copyPastaHtml.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

// для использования бд нужно указывать конфигурацию иначе отправляет на /login
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    //todo: написать конфигурацию
    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        http.cors(c -> c.disable());
        http.csrf(d -> d.disable());


        return http.build();

    }
}
