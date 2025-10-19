package com.Freshmart.store.service;

import com.Freshmart.store.dto.AddressDTO;
import com.Freshmart.store.dto.CustomerResponseDTO;
import com.Freshmart.store.dto.SaveAddressRequestDTO;
import com.Freshmart.store.model.Addresses;
import com.Freshmart.store.model.Customers;
import com.Freshmart.store.repository.AddressRepository;
import com.Freshmart.store.repository.CustomerRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private PasswordEncoder passwordEncoder; // For hashing passwords (CRITICAL!)

    // This reads the 'from' email address from your application.properties
    @Value("${spring.mail.username}")
    private String fromEmail;


    public Customers logoutCustomer(Integer customerId) {
        Optional<Customers> optionalCustomer = customerRepository.findById(customerId);

        if (optionalCustomer.isEmpty()) {
            throw new RuntimeException("Customer not found with id: " + customerId);
        }

        Customers customer = optionalCustomer.get();
        customer.setStatus("logged_out");
        return customerRepository.save(customer);
    }

    /**
     * This is the version of getCustomerDetails you provided.
     * It fetches a customer and only the addresses that are saved in the database.
     */
    public CustomerResponseDTO getCustomerDetails(Integer customerId) {
        Optional<Customers> customerOptional = customerRepository.findById(customerId);

        if (customerOptional.isEmpty()) {
            return null;
        }
        Customers customer = customerOptional.get();
        List<Addresses> addresses = addressRepository.findByCustomerCustomerId(customerId);

        List<AddressDTO> addressDTOs = addresses.stream()
                .map(this::convertToAddressDTO)
                .collect(Collectors.toList());

        return convertToCustomerResponseDTO(customer, addressDTOs);
    }

    /**
     * Saves a new address or updates an existing one for a customer ("upsert").
     */
    public AddressDTO saveOrUpdateAddress(SaveAddressRequestDTO requestDTO) {
        // Step 1: Validate that the customer exists.
        Optional<Customers> customerOptional = customerRepository.findById(requestDTO.getCustomerId());
        if (customerOptional.isEmpty()) {
            return null; // Customer not found, cannot proceed.
        }
        Customers customer = customerOptional.get();

        // Step 2: Check if an address of this type already exists for this customer.
        Optional<Addresses> existingAddressOpt = addressRepository.findByCustomerCustomerIdAndAddressType(
                requestDTO.getCustomerId(),
                requestDTO.getType()
        );

        Addresses addressToSave;
        if (existingAddressOpt.isPresent()) {
            // Step 3a: If it exists, update the existing entity.
            addressToSave = existingAddressOpt.get();
        } else {
            // Step 3b: If it doesn't exist, create a new entity.
            addressToSave = new Addresses();
            addressToSave.setCustomer(customer); // Link to the customer.
            addressToSave.setAddressType(requestDTO.getType());
        }

        // Step 4: Map fields from DTO to the entity (for both create and update).
        addressToSave.setStreet(requestDTO.getStreet());
        addressToSave.setCity(requestDTO.getCity());
        addressToSave.setState(requestDTO.getState());
        addressToSave.setPostalCode(requestDTO.getPostalCode());
        addressToSave.setCountry(requestDTO.getCountry());
        addressToSave.setLandmark(requestDTO.getLandmark());

        // Step 5: Save the entity to the database.
        Addresses savedAddress = addressRepository.save(addressToSave);

        // Step 6: Convert the saved entity back to a DTO for the response.
        return convertToAddressDTO(savedAddress);
    }

    public void handleForgotPassword(String email, String siteURL)
            throws MessagingException, UsernameNotFoundException {

        // 1. Find customer by email
        Customers customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("No customer found with email: " + email));

        // 2. Generate a unique token
        String token = UUID.randomUUID().toString();
        // 3. Set expiry time (e.g., 15 minutes from now)
        LocalDateTime expiryDate = LocalDateTime.now().plusMinutes(15);

        // 4. Save the token and expiry date to the customer entity
        customer.setResetPasswordToken(token);
        customer.setResetTokenExpiryDate(expiryDate);
        customerRepository.save(customer);

        // 5. Create the full reset link and send the email
        String resetLink = siteURL + token;
        sendPasswordResetEmail(customer.getEmail(), resetLink);
    }

    /**
     * Resets the user's password if the token is valid.
     */
    public void resetPassword(String token, String newPassword) {
        // 1. Find customer by the reset token (we made this in CustomerRepository)
        Customers customer = customerRepository.findByResetPasswordToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token."));

        // 2. Check if the token is expired
        if (customer.getResetTokenExpiryDate().isBefore(LocalDateTime.now())) {
            // Token is expired, clear it and throw an error
            customer.setResetPasswordToken(null);
            customer.setResetTokenExpiryDate(null);
            customerRepository.save(customer);
            throw new RuntimeException("Expired token. Please request a new reset link.");
        }

        // 3. Token is valid! Hash the new password
        String newHashedPassword = passwordEncoder.encode(newPassword);
        customer.setPassword(newHashedPassword);

        // 4. IMPORTANT: Invalidate the token by setting it to null
        customer.setResetPasswordToken(null);
        customer.setResetTokenExpiryDate(null);

        // 5. Save the customer with the new password and nullified token
        customerRepository.save(customer);
    }

    /**
     * A private helper method to compose and send the email.
     */
    private void sendPasswordResetEmail(String toEmail, String resetLink) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true); // true = allow HTML

        helper.setFrom(fromEmail);
        helper.setTo(toEmail);
        helper.setSubject("Password Reset Request for Freshmart");

        // Basic HTML content for the email
        String content = "<p>Hello,</p>"
                + "<p>You have requested to reset your password for your Freshmart account.</p>"
                + "<p>This link is valid for 15 minutes.</p>"
                + "<p>Click the link below to change your password:</p>"
                + "<p><a href=\"" + resetLink + "\" style=\"background-color: #4CAF50; color: white; padding: 10px 15px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px;\">Change My Password</a></p>"
                + "<br>"
                + "<p>If you did not make this request, please ignore this email.</p>";

        helper.setText(content, true); // true = this text is HTML
        mailSender.send(message);
    }

    // --- Helper Methods ---

    private AddressDTO convertToAddressDTO(Addresses address) {
        AddressDTO dto = new AddressDTO();
        dto.setType(address.getAddressType());
        dto.setStreet(address.getStreet());
        dto.setCity(address.getCity());
        dto.setState(address.getState());
        dto.setPostal_code(address.getPostalCode());
        dto.setCountry(address.getCountry());
        dto.setLandmark(address.getLandmark());
        return dto;
    }

    private CustomerResponseDTO convertToCustomerResponseDTO(Customers customer, List<AddressDTO> addressDTOs) {
        CustomerResponseDTO dto = new CustomerResponseDTO();
        dto.setUsername(customer.getName());
        dto.setEmail(customer.getEmail());
        dto.setPhone(String.valueOf(customer.getPhone()));
        dto.setAddresses(addressDTOs);
        return dto;
    }
}