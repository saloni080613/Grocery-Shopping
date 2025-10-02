package com.Freshmart.store;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan("com.Freshmart.store.model")
public class GroceryStoreApplication {

    public static void main(String[] args) {
        SpringApplication.run(GroceryStoreApplication.class, args);
    }
}