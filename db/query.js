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
        const { rows } = await pool.query("SELECT * FROM categories ORDER BY id")
        return rows; 
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw new Error('Unable to fetch categories');
    }
}

async function getAllBooks(){
    try {
        const { rows } = await pool.query("SELECT * FROM books ORDER BY id")
        return rows; 
    } catch (error) {
        console.error('Error fetching books:', error);
        throw new Error('Unable to fetch books');
    }
}

async function getAllSuppliers(){
    try {
        const { rows } = await pool.query("SELECT * FROM suppliers")
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

async function getBookDetail(id){
    try {  
        const { rows } = await pool.query(`SELECT books.id, title, author, isbn, price, description, categoryid, supplierid, stock, categoryname, suppliername, contactinfo  
                                   FROM books 
                                   INNER JOIN categories ON books.categoryid = categories.id 
                                   INNER JOIN suppliers ON books.supplierid = suppliers.id
                                   WHERE books.id=$1;`, [id])
        return rows[0]
    } catch (error) {
        console.error("Error getting book detail:", error);
        throw error; // Re-throw the error to handle it in route/controller
    }
}

async function editBook(id, title, author, ISBN, price, description, categoryid, supplierid, stock){
    try {
        await pool.query(`UPDATE books
                          SET title = $1,
                              author = $2,
                              ISBN = $3,
                              price = $4,
                              description = $5,
                              categoryid = $6,
                              supplierid = $7,
                              stock = $8
                          WHERE id = $9;`, [title, author, ISBN, price, description, categoryid, supplierid, stock, id])
    } catch (error) {
        console.error("Error editing book:", error);
        throw error; // Re-throw the error to handle it in route/controller
    }
}

async function deleteBook(id){
    try {
        await pool.query("DELETE FROM books WHERE id=$1", [id])
    } catch (error) {
        console.error("Error deleting book:", error);
        throw error; // Re-throw the error to handle it in route/controller
    }
}

async function deleteCategory(id){
    try {
        await pool.query("DELETE FROM categories WHERE id=$1", [id])
    } catch (error) {
        console.error("Error deleting category:", error);
        throw error; // Re-throw the error to handle it in route/controller
    }
}

async function getCategory(id){
    try {
        const { rows } = await pool.query("SELECT * FROM categories WHERE id = $1", [id])
        return rows[0]
    } catch (error) {
        console.error("Error getting category:", error);
        throw error; // Re-throw the error to handle it in route/controller
    }
}

async function updateCategory(categoryid, categoryname){
    try {
        await pool.query("UPDATE categories SET categoryname = $1 WHERE id = $2", [categoryname, categoryid])
    } catch (error) {
        console.error("Error updating category:", error);
        throw error; // Re-throw the error to handle it in route/controller
    }
}

async function deleteSupplier(supplierid){
    try {
        await pool.query("DELETE FROM suppliers WHERE id = $1", [supplierid])
    } catch (error) {
        console.error("Error deleting supplier:", error);
        throw error; // Re-throw the error to handle it in route/controller
    }
}

async function addSupplier(suppliername, contact){
    try {
        await pool.query("INSERT INTO suppliers (suppliername, contactinfo) VALUES ($1, $2)", [suppliername, contact])
    } catch (error) {
        console.error("Error adding supplier:", error);
        throw error; // Re-throw the error to handle it in route/controller
    }
}

module.exports = { 
    addBook,
    getAllCategories,
    getAllBooks,
    getAllSuppliers,
    addCategory,
    getBookDetail,
    editBook,
    deleteBook,
    deleteCategory,
    getCategory,
    updateCategory,
    deleteSupplier,
    addSupplier
 };
