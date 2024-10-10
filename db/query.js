const pool = require("./pool");

async function addBook(title, author, ISBN, price, description, categoryId, supplierId, stock) {
    try {
        const queryText = `
            INSERT INTO books (title, author, ISBN, price, description, categoryid, supplierid, stock)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
        `;
        const values = [title, author, ISBN, price, description, categoryId, supplierId, stock];

        await pool.query(queryText, values);
        
    } catch (error) {
        console.error("Error adding book:", error);
        throw error; // Re-throw the error to handle it in route/controller
    }
}

async function getAllCategories(){
    try {
        const { rows } = await pool.query("SELECT * FROM categories")
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

async function addCategory(title){
    try {
        await pool.query("INSERT INTO categories (categoryname) VALUES ($1);", [title])
    } catch (error) {
        console.error("Error adding category:", error);
        throw error; // Re-throw the error to handle it in route/controller
    }
}

module.exports = { 
    addBook,
    getAllCategories,
    getAllBooks,
    getAllSuppliers,
    addCategory
 };
