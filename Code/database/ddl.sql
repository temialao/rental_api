-- cars definition
CREATE TABLE cars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    maker TEXT,
    model TEXT, 
    added_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
    manufactured_at TEXT, 
    milage NUMERIC
);

-- rents definition
CREATE TABLE rents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    car_id INTEGER,
    user_id INTEGER,
    rented_at TEXT DEFAULT (null),
    returned_at TEXT DEFAULT (null),
    milage_done NUMERIC DEFAULT 0
);

-- users definition
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    name TEXT,
    dob TEXT
);

-- Seed cars table
INSERT INTO cars (maker, model, manufactured_at, milage) VALUES
('Tesla', 'Model S', '2022-01-01', 10000),
('BMW', 'i8', '2021-05-12', 5000),
('Toyota', 'Camry', '2018-01-01', 20000),
('Ford', 'Fusion', '2019-01-01', 15000),
('Honda', 'Accord', '2020-01-01', 10000),
('Chevrolet', 'Malibu', '2021-01-01', 5000),
('Hyundai', 'Sonata', '2022-01-01', 2500),
('Nissan', 'Altima', '2017-01-01', 30000),
('Kia', 'Optima', '2016-01-01', 35000),
('Subaru', 'Legacy', '2015-01-01', 40000),
('Volkswagen', 'Passat', '2014-01-01', 45000),
('Mercedes', 'C-Class', '2013-01-01', 50000),
('BMW', '3 Series', '2018-01-01', 20000),
('Audi', 'A4', '2019-01-01', 15000),
('Porsche', '911', '2020-01-01', 10000),
('Lamborghini', 'Huracan', '2021-01-01', 5000),
('Ferrari', '488', '2022-01-01', 2500),
('Rolls-Royce', 'Phantom', '2017-01-01', 30000),
('Bentley', 'Continental', '2016-01-01', 35000),
('Bugatti', 'Chiron', '2015-01-01', 40000),
('McLaren', '720S', '2014-01-01', 45000),
('Aston Martin', 'Vantage', '2013-01-01', 50000),
('Mercedes', 'S Class', '2022-04-08', 3000);

-- Seed users table
INSERT INTO users (email, name, dob) VALUES
('john.doe@example.com', 'John Doe', '1990-01-01'),
('jane.doe@example.com', 'Jane Doe', '1992-05-12'),
('john.doe@example.com', 'John Doe', '1980-01-01'),
('jane.doe@example.com', 'Jane Doe', '1981-01-01'),
('mike.smith@example.com', 'Mike Smith', '1982-01-01'),
('lisa.smith@example.com', 'Lisa Smith', '1983-01-01'),
('tom.jones@example.com', 'Tom Jones', '1984-01-01'),
('susan.jones@example.com', 'Susan Jones', '1985-01-01'),
('jim.brown@example.com', 'Jim Brown', '1986-01-01'),
('pam.brown@example.com', 'Pam Brown', '1987-01-01'),
('bob.wilson@example.com', 'Bob Wilson', '1988-01-01'),
('nancy.wilson@example.com', 'Nancy Wilson', '1989-01-01'),
('smith.jones@example.com', 'Smith Jones', '1988-10-15');

-- Seed rents table
INSERT INTO rents (car_id, user_id, rented_at, returned_at, milage_done) VALUES
(1, 1, '2023-01-01T10:00:00.000Z', '2023-01-02T10:00:00.000Z', 200),
(2, 2, '2023-02-01T10:00:00.000Z', '2023-02-05T10:00:00.000Z', 500),
(1, 2, '2023-01-01', '2023-01-02', 100),
(3, 4, '2023-01-02', '2023-01-03', 200),
(5, 6, '2023-01-03', '2023-01-04', 300),
(7, 8, '2023-01-04', '2023-01-05', 400),
(9, 10, '2023-01-05', '2023-01-06', 500),
(2, 1, '2023-01-06', '2023-01-07', 600),
(4, 3, '2023-01-07', '2023-01-08', 700),
(6, 5, '2023-01-08', '2023-01-09', 800),
(8, 7, '2023-01-09', '2023-01-10', 900),
(10, 9, '2023-01-10', '2023-01-11', 1000),
(3, 3, '2023-03-01T10:00:00.000Z', '2023-03-10T10:00:00.000Z', 1000);
