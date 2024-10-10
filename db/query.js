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

async function getAllCategories(){
    try {
        const { rows } = await pool.query("SELECT categoryname FROM categories")
        return rows; 
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw new Error('Unable to fetch categories');
    }
}

async function getAllBooks(){
    try {
        const { rows } = await pool.query("SELECT * FROM books")
        return rows; 
    } catch (error) {
        console.error('Error fetching books:', error);
        throw new Error('Unable to fetch books');
    }
}

async function getAllSuppliers(){
    try {
        const { rows } = await pool.query("SELECT id, suppliername FROM suppliers")
        return rows;
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        throw new Error('Unable to fetch suppliers');
    }
}

module.exports = { 
    addBook,
    getAllCategories,
    getAllBooks,
    getAllSuppliers
 };
