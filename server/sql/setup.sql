DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS reset;
DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS movies;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first VARCHAR(255),
    last VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    profile_img VARCHAR,
    bio VARCHAR,
    city VARCHAR(255),
    twitter VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reset(
    id SERIAL PRIMARY KEY,
    email VARCHAR REFERENCES users(email) ON DELETE CASCADE,
    code VARCHAR(6),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE images(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE mixtapes(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    draft BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE items(
    id SERIAL PRIMARY KEY,
    type VARCHAR,
    title VARCHAR NOT NULL,
    description VARCHAR,
    mixtape_id INTEGER REFERENCES mixtapes(id) ON DELETE CASCADE,
    image VARCHAR,
    url VARCHAR,
    year VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

