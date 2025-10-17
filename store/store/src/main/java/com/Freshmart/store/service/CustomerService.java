package com.Freshmart.store.service;

import com.Freshmart.store.dto.AddressDTO;
import com.Freshmart.store.dto.CustomerResponseDTO;
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
