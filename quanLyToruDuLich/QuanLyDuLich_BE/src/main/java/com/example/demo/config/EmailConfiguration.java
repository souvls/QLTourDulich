package com.example.demo.config;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import lombok.Data;

@Data
@Configuration
public class EmailConfiguration {
	@Value("${config.mail.host}")
    private String host;

    @Value("${config.mail.port}")
    private String port;

    @Value("${config.mail.username}")
    private String username;

    @Value("${config.mail.password}")
    private String password;

    @Value("${config.mail.auth}")
    private boolean auth;

    @Value("${config.mail.starttls}")
    private boolean starttls;

    @Bean
    public JavaMailSender getJavaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(host);
        mailSender.setPort(Integer.parseInt(port)); 

        mailSender.setUsername(username);
        mailSender.setPassword(password);
        mailSender.setDefaultEncoding("UTF-8");

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", String.valueOf(auth));
        props.put("mail.smtp.starttls.enable", String.valueOf(starttls));

        return mailSender;
    }
}
