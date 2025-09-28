package com.Freshmart.store;

// Import all the necessary classes
import com.Freshmart.store.model.Category;
import com.Freshmart.store.model.Product;
import com.Freshmart.store.repository.CategoryRepository;
import com.Freshmart.store.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class GroceryStoreApplication {

    // These lines allow us to use the repositories in this class
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ProductRepository productRepository;

    public static void main(String[] args) {
        SpringApplication.run(GroceryStoreApplication.class, args);
    }

    // This is the data seeder bean that runs on startup
    @Bean
    CommandLineRunner runner() {
        return args -> {

            // --- Create Categories ---
            Category fruits = new Category();
            fruits.setName("Fruits");
            categoryRepository.save(fruits);

            Category dairy = new Category();
            dairy.setName("Dairy");
            categoryRepository.save(dairy);

            Category bakery = new Category();
            bakery.setName("Bakery");
            categoryRepository.save(bakery);

            Category vegetables = new Category();
            vegetables.setName("Vegetables");
            categoryRepository.save(vegetables);

            // --- Create Products (without image URLs as you requested) ---
            Product apples = new Product();
            apples.setName("Fresh Apples");
            apples.setCategory(fruits);
            apples.setPrice(2.99);
            apples.setInStock(true);
            productRepository.save(apples);

            Product milk = new Product();
            milk.setName("Whole Milk");
            milk.setCategory(dairy);
            milk.setPrice(3.49);
            milk.setInStock(true);
            productRepository.save(milk);

            Product bread = new Product();
            bread.setName("Brown Bread");
            bread.setCategory(bakery);
            bread.setPrice(1.99);
            bread.setInStock(false);
            productRepository.save(bread);
        };
    }
}