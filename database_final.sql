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

insert into Admins values (1,'Meet','password',7021431706,"meetj366@gmail.com",'logged_out');

INSERT INTO Products (name, price, image_url, stock_quantity, category_id)
VALUES
('Tomato', 30.00, 'https://images-prod.healthline.com/hlcmsresource/images/AN_images/tomatoes-1296x728-feature.jpg', 100, 1),
('Onion', 25.00, 'https://thumbs.dreamstime.com/b/pile-red-onions-background-heads-im-market-132370194.jpg', 120, 1),
('Spinach', 20.00, 'https://tse4.mm.bing.net/th/id/OIP.smwnzgY1bOPNdwFTx8DlGwHaJB?rs=1&pid=ImgDetMain&o=7&rm=3', 80, 1),
('Cow Milk (1L)', 45.00, 'https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 50, 2),
('Paneer (500g)', 200.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcmNKVOO1qOY1ptp6PqpnnBiMjrjBllaMmAA&s', 3, 2),
('Buttermilk (500ml)', 30.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcxPua7fw57H8uKzt2OIrNgxXHV4yoem7kxw&s', 40, 2),
('Green Gram (Moong)', 60.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtrlC-EfvUF6vI4Rnwd7G_9yJLeJfadWxfIw&s', 0, 3),
('Moth Bean (Matki)', 70.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOA9nxDhK-6dSNbfStslxCf0TuJ5YqdCh7ag&s', 50, 3),
('Chickpea (Chana)', 80.00, 'https://www.shayonauk.com/cdn/shop/files/FudcoChickpeasWM_5782d60e-f8a9-4a7a-a6a5-1a9540e12fb8.jpg?v=1720469999', 45, 3);



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
