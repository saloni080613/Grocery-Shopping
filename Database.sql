
DROP TABLE IF EXISTS Payments;
DROP TABLE IF EXISTS Cart;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS Addresses;
DROP TABLE IF EXISTS Admins;
DROP TRIGGER IF EXISTS before_insert_cart_item;


CREATE TABLE Addresses (
    address_id INT AUTO_INCREMENT PRIMARY KEY,
    street_address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    postal_code VARCHAR(20) NOT NULL
);


CREATE TABLE Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL
);


CREATE TABLE Customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NULL,
    phone BIGINT(10) NOT NULL UNIQUE,
    address_id INT,
    FOREIGN KEY (address_id) REFERENCES Addresses(address_id),
    -- Constraint to ensure the phone number is exactly 10 digits
    CONSTRAINT chk_phone_length CHECK (phone >= 1000000000 AND phone <= 9999999999)
);


CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(500),
    quantity INT DEFAULT 0,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);


CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10,2),
    total_quantity INT,
    status VARCHAR(50) DEFAULT NULL, -- New status column
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);


CREATE TABLE Payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    payment_method VARCHAR(50),
    total_amount DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);


CREATE TABLE Cart (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    product_id INT,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);


CREATE TABLE Admins (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone BIGINT(10) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    -- Constraint to ensure the phone number is exactly 10 digits
    CONSTRAINT chk_admin_phone_length CHECK (phone >= 1000000000 AND phone <= 9999999999)
);

-- Create the trigger
DELIMITER $$
CREATE TRIGGER before_insert_cart_item
BEFORE INSERT ON Cart
FOR EACH ROW
BEGIN
    DECLARE unit_price DECIMAL(10,2);
    -- Get the unit price of the product from the Products table
    SELECT price INTO unit_price FROM Products WHERE product_id = NEW.product_id;
    -- Calculate the total price for the line item and set it
    SET NEW.price = NEW.quantity * unit_price;
END$$
DELIMITER ;



INSERT INTO Categories (category_name)
VALUES ('Vegetables'), ('Dairy'), ('Sprouts');



INSERT INTO Products (name, price, image_url, quantity, category_id)
VALUES
('Tomato', 30.00, 'https://images-prod.healthline.com/hlcmsresource/images/AN_images/tomatoes-1296x728-feature.jpg', 100, 1),
('Onion', 25.00, 'https://thumbs.dreamstime.com/b/pile-red-onions-background-heads-im-market-132370194.jpg', 120, 1),
('Spinach', 20.00, 'https://tse4.mm.bing.net/th/id/OIP.smwnzgY1bOPNdwFTx8DlGwHaJB?rs=1&pid=ImgDetMain&o=7&rm=3', 80, 1),
('Cow Milk (1L)', 45.00, 'https://tse1.mm.bing.net/th/id/OIP.U4e60_zJ31kY2zP7i7S7zAHaHa?rs=1&pid=ImgDetMain', 50, 2),
('Paneer (500g)', 200.00, 'https://tse3.mm.bing.net/th/id/OIP.IeH0F_U74S0P-F8m2y_r7gHaHa?rs=1&pid=ImgDetMain', 30, 2),
('Buttermilk (500ml)', 30.00, 'https://tse1.mm.bing.net/th/id/OIP.y-m3J9oG1J3y6gV8e9Lw5gHaE8?rs=1&pid=ImgDetMain', 40, 2),
('Green Gram (Moong)', 60.00, 'https://tse1.mm.bing.net/th/id/OIP.dI-5jO1Y5s7l9k7l2l5r1wHaE8?rs=1&pid=ImgDetMain', 60, 3),
('Moth Bean (Matki)', 70.00, 'https://tse4.mm.bing.net/th/id/OIP.B5S9T-s3t8S6P-e1S1D62wHaHa?rs=1&pid=ImgDetMain', 50, 3),
('Chickpea (Chana)', 80.00, 'https://tse3.mm.bing.net/th/id/OIP.d7D-oY9w8S0s4l0F5e0S7wHaHa?rs=1&pid=ImgDetMain', 45, 3);


INSERT INTO Addresses (street_address, city, state, postal_code)
VALUES
('123 Main St', 'Delhi', 'Delhi', '110001'),
('45 MG Road', 'Mumbai', 'Maharashtra', '400001');


INSERT INTO Customers (name, email, phone, address_id)
VALUES
('Ravi Kumar', 'ravi@example.com', 9876543210, 1),
('Priya Sharma', 'priya@example.com', 9123456780, 2);



INSERT INTO Admins (name, phone, email)
VALUES
('Admin A', 9000000001, 'admin_a@example.com'),
('Admin B', 9000000002, 'admin_b@example.com');


INSERT INTO Orders (customer_id, total_amount, total_quantity, status)
VALUES
(1, NULL, NULL, NULL),
(2, NULL, NULL, NULL);



INSERT INTO Cart (customer_id, product_id, quantity)
VALUES
(1, 1, 2),
(1, 4, 1),
(2, 2, 3),
(2, 7, 2),
(2, 8, 1);



SET SQL_SAFE_UPDATES = 0;
UPDATE Orders o
JOIN (
    SELECT customer_id, SUM(price) AS total_price, SUM(quantity) AS total_items
    FROM Cart
    GROUP BY customer_id
) c ON o.customer_id = c.customer_id
SET o.total_amount = c.total_price,
    o.total_quantity = c.total_items;

-- Insert Payments
INSERT INTO Payments (order_id, payment_method, total_amount)
SELECT order_id, 'Cash on Delivery', total_amount
FROM Orders
WHERE customer_id = 1;

INSERT INTO Payments (order_id, payment_method, total_amount)
SELECT order_id, 'UPI', total_amount
FROM Orders
WHERE customer_id = 2;

SET SQL_SAFE_UPDATES = 1;

-- Final SELECT statements
SELECT * FROM Customers;
desc Customers;
SELECT * FROM Addresses;
SELECT * FROM Categories;
SELECT * FROM Products;
SELECT * FROM Cart;
SELECT * FROM Orders;
SELECT * FROM Payments;
SELECT * FROM Admins;