CREATE DATABASE IF NOT EXISTS groceries;
USE groceries;

DROP TABLE IF EXISTS Payments;
DROP TABLE IF EXISTS Cart;
DROP TABLE IF EXISTS Wishlist;
DROP TABLE IF EXISTS Order_items;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Addresses;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Admins;



CREATE TABLE Customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone BIGINT NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    status ENUM('logged_in', 'logged_out') DEFAULT 'logged_out',
    reset_password_token VARCHAR(255) DEFAULT NULL UNIQUE,
	reset_token_expiry_date DATETIME DEFAULT NULL,
    CONSTRAINT chk_phone_length CHECK (phone >= 1000000000 AND phone <= 9999999999)
);


CREATE TABLE Addresses (
    address_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(50) DEFAULT 'India',
    landmark VARCHAR(50),
    address_type ENUM('Home', 'Office', 'Other'),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);


CREATE TABLE Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL
);


CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(500),
    stock_quantity INT DEFAULT 1,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);


CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10,2),
    total_quantity INT,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(50) DEFAULT 'India',
    landmark VARCHAR(50),
    status ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Failed', 'Cancelled') NOT NULL DEFAULT 'Pending',
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

CREATE TABLE Order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    product_quantity INT NOT NULL,
    product_price DECIMAL(10,2) NOT NULL,
    UNIQUE KEY uq_order_items_customer_product (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
); 


CREATE TABLE Payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    payment_method VARCHAR(50),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);


CREATE TABLE Cart (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    UNIQUE KEY uq_cart_customer_product (customer_id, product_id),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

CREATE TABLE Wishlist (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    product_id INT NOT NULL,
    UNIQUE KEY uq_wishlist_customer_product (customer_id, product_id),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);


CREATE TABLE Admins (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(60) NOT NULL,
    phone BIGINT NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
	reset_password_token VARCHAR(255) DEFAULT NULL UNIQUE,
	reset_token_expiry_date DATETIME DEFAULT NULL,
    status ENUM('logged_in', 'logged_out') DEFAULT 'logged_out',
    CONSTRAINT chk_admin_phone_length CHECK (phone >= 1000000000 AND phone <= 9999999999)
);




INSERT INTO Categories (category_name)
VALUES ('Fresh Vegetables & Fruits'),('Dairy, Bread & Eggs'),('Grains, Pulses & Oils'),('Snacks & Beverages'),('Household & Personal Care');

insert into Admins(admin_id, name, password, phone, email, status) values (1,'Meet','$2a$10$CJNGhu0S6xZDGpl1MFvrKO7lsX2UTeMBcqABf5ryPy08UmoLew70u',7021431706,"meetj366@gmail.com",'logged_out');

INSERT INTO Products (name, price, image_url, stock_quantity, category_id)
VALUES 
-- Category 1: Fresh Vegetables & Fruits
('Tomato (1kg)', 40.00, 'https://plus.unsplash.com/premium_photo-1669906333449-5fc2c47cd8ec?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dG9tYXRvfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500', 150, 1),
('Onion (1kg)', 35.00, 'https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b25pb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500', 200, 1),
('Potato (1kg)', 30.00, 'https://plus.unsplash.com/premium_photo-1724256031339-6b90e3b61aa1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBvdGF0b3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500', 180, 1),
('Spinach (1 Bunch)', 20.00, 'https://plus.unsplash.com/premium_photo-1701714006884-30414c114152?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170', 0, 1),
('Apple - Royal Gala (1kg)', 180.00, 'https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a', 70, 1),
('Banana - Robusta (1 Dozen)', 60.00, 'https://images.unsplash.com/photo-1528825871115-3581a5387919', 90, 1),

-- Category 2: Dairy, Bread & Eggs
('Fresh Toned Milk (1L Carton)', 55.00, 'https://images.unsplash.com/photo-1602153508753-4ace888c10a0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWlsa3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500', 60, 2),
('Fresh Paneer (200g Block)', 90.00, 'https://plus.unsplash.com/premium_photo-1726079619679-3b947c951a7c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZnJlc2glMjBwYW5lZXIlMjBibG9ja3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500', 30, 2),
('Classic Bread (400g Loaf)', 45.00, 'https://images.unsplash.com/photo-1615329399228-5d5d98a40e35?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnJvd24lMjBicmVhZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500', 50, 2),
('Classic White Eggs (12 Pack)', 85.00, 'https://plus.unsplash.com/premium_photo-1700004502440-aed2c0d909d8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Q2xhc3NpYyUyMFdoaXRlJTIwRWdncyUyMCgxMiUyMFBhY2spfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500', 45, 2),

-- Category 3: Grains, Pulses & Oils
('Moong Dal (1kg)', 140.00, 'https://images.unsplash.com/photo-1694679671688-3d9bb5e77f37?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TW9vbmclMjBEYWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500', 50, 3),
('Basmati Rice (1kg)', 110.00, 'https://images.unsplash.com/photo-1686820740687-426a7b9b2043?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFzbWF0aSUyMHJpY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500', 80, 3),
('Olive Oil (1L Bottle)', 150.00, 'https://images.unsplash.com/photo-1757801333112-7b89af15c7fe?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3VuZmxvd2VyJTIwb2lsJTIwYm90dGxlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500', 60, 3),

-- Category 4: Snacks & Beverages
('Potato Chips - Classic Salted (90g)', 30.00, 'https://images.unsplash.com/photo-1694101493243-864532ed5bce?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG90YXRvJTIwY2hpcHMlMjBiYWd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500', 100, 4),
('Instant Coffee (50g Jar)', 145.00, 'https://images.unsplash.com/photo-1663404846161-4cb9d88e5342?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGluc3RhbnQlMjBjb2ZmZWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500', 75, 4),
('Orange Juice (1L Carton)', 120.00, 'https://images.unsplash.com/photo-1694886712783-5eefee63cedc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b3JhbmdlJTIwanVpY2UlMjBib3R0bGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500', 65, 4),

-- Category 5: Household & Personal Care
('Liquid Handwash (250ml Pump)', 99.00, 'https://images.unsplash.com/photo-1694101395693-1a4e5d364ae1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c29hcCUyMCUyMGJvdHRsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500', 80, 5),
('Toilet Paper (4-in-1 Pack)', 130.00, 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRvaWxldCUyMHBhcGVyJTIwcm9sbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500', 90, 5);

-- Final SELECT statements
SELECT * FROM Customers;
DESC Customers;
SELECT * FROM Addresses;
SELECT * FROM Categories;
SELECT * FROM Products;
SELECT * FROM Cart;
SELECT * FROM Orders;
SELECT * FROM Payments;
SELECT * FROM Admins;
