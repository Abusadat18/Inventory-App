#! /usr/bin/env node

const { Client } = require("pg");
require('dotenv').config()

const SQL = `

TRUNCATE books RESTART IDENTITY CASCADE;
TRUNCATE categories RESTART IDENTITY CASCADE;
TRUNCATE suppliers RESTART IDENTITY CASCADE;

INSERT INTO categories (categoryname) VALUES
('Science'),
('Technology'),
('Self-Help'),
('Biography'),
('History'),
('Islam'),
('Education'),
('Psychology'),
('Health'),
('Business');

INSERT INTO suppliers (suppliername, contactInfo) VALUES
('Book Supplier 1', '1234567890'),
('Book Supplier 2', '2345678901'),
('Book Supplier 3', '3456789012'),
('Book Supplier 4', '4567890123'),
('Book Supplier 5', '5678901234');

INSERT INTO books (title, author, isbn, price, description, categoryid, supplierid, stock) VALUES

('A Brief History of Time', 'Stephen Hawking', '9780553380163', 18.75, 'Science book about the universe', 1, 1, 30),

('The Pragmatic Programmer', 'Andrew Hunt', '9780201616224', 29.99, 'A guide for programmers', 2, 3, 100),
('The Innovators', 'Walter Isaacson', '9781476708706', 19.99, 'Book on tech innovators', 2, 4, 50),

('Atomic Habits', 'James Clear', '9780735211292', 16.99, 'Self-help book on habits', 3, 3, 60),
('The Power of Habit', 'Charles Duhigg', '9780812981605', 12.49, 'Book on habits and personal development', 3, 2, 40),

('Steve Jobs', 'Walter Isaacson', '9781451648539', 22.99, 'Biography of Steve Jobs', 4, 5, 70),
('Becoming', 'Michelle Obama', '9781524763138', 23.99, 'Michelle Obamas memoir', 4, 1, 80),

('Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', '9780062316097', 19.99, 'A history of humanity', 5, 3, 60),
('The Silk Roads: A New History of the World', 'Peter Frankopan', '9781101912379', 21.49, 'A history of the Silk Roads', 5, 4, 35),

('Dont Be Sad', 'Aaidh ibn Abdullah al-Qarni', '9789960850443', 15.99, 'A self-help book by Salafi scholar', 6, 1, 50),
('The Fundamentals of Tawheed', 'Bilal Philips', '9789960850801', 12.99, 'A book on the oneness of Allah by a Salafi scholar', 6, 2, 45),
('Kitab At-Tawheed', 'Muhammad Ibn Abdul Wahhab', '9789960892344', 17.49, 'A classical Salafi book on Tawheed', 6, 3, 60),

('Educated', 'Tara Westover', '9780399590504', 13.99, 'A memoir on education', 7, 4, 45),
('The Element: How Finding Your Passion Changes Everything', 'Ken Robinson', '9780143116738', 11.99, 'A book on education and creativity', 7, 5, 50),

('Thinking, Fast and Slow', 'Daniel Kahneman', '9780374533557', 14.49, 'Book on psychology', 8, 2, 80),
('Mans Search for Meaning', 'Viktor E. Frankl', '9780807014271', 9.99, 'Psychology and philosophy book', 8, 3, 50),

('Why We Sleep', 'Matthew Walker', '9781501144318', 13.99, 'Health and sleep science book', 9, 2, 75),
('The China Study', 'T. Colin Campbell', '9781932100662', 17.99, 'Book on nutrition and health', 9, 1, 60),

('Good to Great', 'Jim Collins', '9780066620992', 20.49, 'Business book on success', 10, 4, 55),
('Zero to One', 'Peter Thiel', '9780804139299', 17.99, 'Startup book on innovation', 10, 5, 100);
`

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:6543/${process.env.DB_NAME}`
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();

/* CREATE TABLE books (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  ISBN VARCHAR(13) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  categoryid INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  supplierid INTEGER NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
  stock INTEGER NOT NULL
);

CREATE TABLE suppliers (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  supplierName VARCHAR(255) NOT NULL,
  contactInfo VARCHAR(20) NOT NULL
);

CREATE TABLE categories (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  categoryName VARCHAR(100) NOT NULL
); */