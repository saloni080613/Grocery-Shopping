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
    password VARCHAR(20) NOT NULL,
    status ENUM('logged_in', 'logged_out') DEFAULT 'logged_out',
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
    status ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Failed') NOT NULL DEFAULT 'Pending',
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

CREATE TABLE Order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    product_id INT NOT NULL,
    product_quantity INT NOT NULL,
    product_price DECIMAL(10,2) NOT NULL,
    UNIQUE KEY uq_order_items_customer_product (customer_id, product_id),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
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
    password VARCHAR(20) NOT NULL,
    phone BIGINT NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    status ENUM('logged_in', 'logged_out') DEFAULT 'logged_out',
    CONSTRAINT chk_admin_phone_length CHECK (phone >= 1000000000 AND phone <= 9999999999)
);




INSERT INTO Categories (category_name)
VALUES ('Vegetables'), ('Dairy'), ('Sprouts');



INSERT INTO Products (name, price, image_url, stock_quantity, category_id)
VALUES
('Tomato', 30.00, 'https://images-prod.healthline.com/hlcmsresource/images/AN_images/tomatoes-1296x728-feature.jpg', 100, 1),
('Onion', 25.00, 'https://thumbs.dreamstime.com/b/pile-red-onions-background-heads-im-market-132370194.jpg', 120, 1),
('Spinach', 20.00, 'https://tse4.mm.bing.net/th/id/OIP.smwnzgY1bOPNdwFTx8DlGwHaJB?rs=1&pid=ImgDetMain&o=7&rm=3', 80, 1),
('Cow Milk (1L)', 45.00, 'https://unsplash.com/photos/itambe-natural-milk-carton-dxb_HSjoQ40.jpn', 50, 2),
('Paneer (500g)', 200.00, 'https://tse3.mm.bing.net/th/id/OIP.IeH0F_U74S0P-F8m2y_r7gHaHa?rs=1&pid=ImgDetMain', 30, 2),
('Buttermilk (500ml)', 30.00, 'https://tse1.mm.bing.net/th/id/OIP.y-m3J9oG1J3y6gV8e9Lw5gHaE8?rs=1&pid=ImgDetMain', 40, 2),
('Green Gram (Moong)', 60.00, 'https://tse1.mm.bing.net/th/id/OIP.dI-5jO1Y5s7l9k7l2l5r1wHaE8?rs=1&pid=ImgDetMain', 60, 3),
('Moth Bean (Matki)', 70.00, 'https://tse4.mm.bing.net/th/id/OIP.B5S9T-s3t8S6P-e1S1D62wHaHa?rs=1&pid=ImgDetMain', 50, 3),
('Chickpea (Chana)', 80.00, 'https://tse3.mm.bing.net/th/id/OIP.d7D-oY9w8S0s4l0F5e0S7wHaHa?rs=1&pid=ImgDetMain', 45, 3);



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
