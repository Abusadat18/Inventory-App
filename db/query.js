const pool = require("./pool");

async function addBook(title, author, ISBN, price, desc, categoryId, supplierId, stock) {
    try {
        const queryText = `
            INSERT INTO books (title, author, ISBN, price, description, categoryid, supplierid, stock)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
        `;
        const values = [title, author, ISBN, price, desc, categoryId, supplierId, stock];

        await pool.query(queryText, values);
        
    } catch (err) {
        console.error("Error adding book:", err);
        throw err; // Re-throw the error to handle it in route/controller
    }
}

module.exports = { addBook };
