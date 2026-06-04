CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    label VARCHAR(255) NOT NULL
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(60) NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(255),
    birth_date DATE,
    picture VARCHAR(255),
    username VARCHAR(50) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

CREATE TABLE configurations (
    configuration_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE parameters (
    parameter_id SERIAL PRIMARY KEY,
    property VARCHAR(255) NOT NULL,
    value VARCHAR(255) NOT NULL,
    configuration_id INT NOT NULL,
    FOREIGN KEY (configuration_id) REFERENCES configurations(configuration_id)
);

CREATE TABLE brands (
    brand_id SERIAL PRIMARY KEY,
    label VARCHAR(50) NOT NULL
);

CREATE TABLE cars (
    car_id SERIAL PRIMARY KEY,
    model VARCHAR(50) NOT NULL,
    immatriculation VARCHAR(10) NOT NULL,
    energy_type VARCHAR(20) NOT NULL,
    color VARCHAR(50) NOT NULL,
    user_id INT NOT NULL,
    brand_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (brand_id) REFERENCES brands(brand_id)
);

CREATE TABLE trips (
    trip_id SERIAL PRIMARY KEY,
    departure_date DATE NOT NULL,
    departure_time TIME NOT NULL,
    departure_location VARCHAR(255) NOT NULL,
    arrival_date DATE NOT NULL,
    arrival_time TIME NOT NULL,
    arrival_location VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    available_seats INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    car_id INT NOT NULL,
    FOREIGN KEY (car_id) REFERENCES cars(car_id)
);

CREATE TABLE bookings (
    user_id INT NOT NULL,
    trip_id INT NOT NULL,
    booking_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    PRIMARY KEY (user_id, trip_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (trip_id) REFERENCES trips(trip_id)
);

CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    comment TEXT,
    rate INT NOT NULL CHECK (rate >= 1 AND rate <= 5),
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);