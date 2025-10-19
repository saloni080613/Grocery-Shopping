package com.Freshmart.store.service;

import com.Freshmart.store.model.Customers;
import com.Freshmart.store.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final long EXPIRE_TOKEN_AFTER_MINUTES = 15;

    /**
     * Generates a password reset token and sends it to the user's email.
     * @param email The user's email.
     * @return A success or failure message.
     */
    public String forgotPassword(String email) {
        // Find the customer by email.
        Customers customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Customer not found with this email: " + email));

        // Generate a unique token.
        String token = UUID.randomUUID().toString();

        // Set token and expiry date.
        customer.setResetPasswordToken(token);
        customer.setResetTokenExpiryDate(LocalDateTime.now().plusMinutes(EXPIRE_TOKEN_AFTER_MINUTES));

        // Save the updated customer entity.
        customerRepository.save(customer);

        // Create the password reset link.
        // NOTE: In a real application, the base URL should come from a configuration file.
        String resetLink = "http://localhost:3000/reset-password?token=" + token;

        // Prepare and send the email.
        String emailBody = "Hello " + customer.getName() + ",\n\n"
                + "You have requested to reset your password. "
                + "Please click the link below to reset it:\n"
                + resetLink + "\n\n"
                + "This link will expire in " + EXPIRE_TOKEN_AFTER_MINUTES + " minutes.\n\n"
                + "If you did not request this, please ignore this email.\n\n"
                + "Thanks,\nThe Freshmart Team";

        emailService.sendEmail(customer.getEmail(), "Password Reset Request", emailBody);

        return "Password reset link sent successfully to your email.";
    }

    /**
     * Resets the user's password if the token is valid.
     * @param token The reset token.
     * @param newPassword The new password to set.
     * @return A success or failure message.
     */
    public String resetPassword(String token, String newPassword) {
        // Find the customer by the reset token.
        Customers customer = customerRepository.findByResetPasswordToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid password reset token."));

        // Check if the token has expired.
        if (customer.getResetTokenExpiryDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Password reset token has expired.");
        }

        // Hash the new password.
        customer.setPassword(passwordEncoder.encode(newPassword));

        // Invalidate the token by setting it to null.
        customer.setResetPasswordToken(null);
        customer.setResetTokenExpiryDate(null);

        // Save the customer with the new password.
        customerRepository.save(customer);

        return "Password has been reset successfully.";
    }
}

