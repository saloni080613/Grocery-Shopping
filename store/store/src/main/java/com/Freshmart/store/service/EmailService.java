package com.Freshmart.store.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    /**
     * Sends a simple text email.
     *
     * @param to      The recipient's email address.
     * @param subject The subject of the email.
     * @param body    The text content of the email.
     */
    public void sendEmail(String to, String subject, String body) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(to);
            mailMessage.setSubject(subject);
            mailMessage.setText(body);
            // It's good practice to set the 'from' address.
            // It should be the same as the one configured in application.properties
            mailMessage.setFrom("project123purpose@gmail.com");

            javaMailSender.send(mailMessage);
        } catch (Exception e) {
            // It's better to log the exception rather than just printing to the console.
            // For example, using SLF4J: log.error("Failed to send email", e);
            System.err.println("Error sending email: " + e.getMessage());
        }
    }
}
