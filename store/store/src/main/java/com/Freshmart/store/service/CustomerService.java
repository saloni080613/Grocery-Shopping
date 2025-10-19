package com.Freshmart.store.service;

import com.Freshmart.store.dto.AddressDTO;
import com.Freshmart.store.dto.CustomerResponseDTO;
import com.Freshmart.store.dto.SaveAddressRequestDTO;
import com.Freshmart.store.model.Addresses;
import com.Freshmart.store.model.Customers;
import com.Freshmart.store.repository.AddressRepository;
import com.Freshmart.store.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

import java.util.stream.Collectors;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private AddressRepository addressRepository;


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