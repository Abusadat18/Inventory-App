#! /usr/bin/env node

const { Client } = require("pg");
require('dotenv').config()

const SQL = `

TRUNCATE books RESTART IDENTITY CASCADE;
TRUNCATE categories RESTART IDENTITY CASCADE;
TRUNCATE suppliers RESTART IDENTITY CASCADE;


INSERT INTO categories (categoryname) VALUES
('Fiction'),
('Non-Fiction'),
('Science'),
('Technology'),
('Self-Help');

INSERT INTO suppliers (suppliername, contactInfo) VALUES
('Book Supplier 1', '1234567890'),
('Book Supplier 2', '2345678901'),
('Book Supplier 3', '3456789012');

INSERT INTO books (title, author, isbn, price, description, categoryid, supplierid, stock) VALUES
('Dont Be Sad', 'Aaidh ibn Abdullah al-Qarni', '9789960850443', 15.99, 'A self-help book', 5, 1, 50),
('The Power of Habit', 'Charles Duhigg', '9780812981605', 12.49, 'Book on habits and personal development', 5, 2, 40),
('The Pragmatic Programmer', 'Andrew Hunt', '9780201616224', 29.99, 'A guide for programmers', 4, 3, 100),
('A Brief History of Time', 'Stephen Hawking', '9780553380163', 18.75, 'Science book about the universe', 3, 1, 30),
('To Kill a Mockingbird', 'Harper Lee', '9780060935467', 10.99, 'Fiction classic', 1, 2, 60);
`

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();