const db = require("../db/query")
const asyncHandler = require("express-async-handler");

const { body, validationResult } = require('express-validator');

// Validation Middleware
// Express-Validator automatically checks for values if they can be converted into INT from STRING (for IDS)
const validateAddBook = [
    body('title').notEmpty().withMessage('Title is required'),
    body('author').notEmpty().withMessage('Author is required'),
    body('ISBN').notEmpty().withMessage('ISBN is required')
        .isISBN().withMessage('Invalid ISBN format'),
    body('price').notEmpty().withMessage('Price is required')
        .isNumeric().withMessage('Price must be a number'),
    body('categoryid').notEmpty().withMessage('Category is required')
        .isInt({ min: 1 }).withMessage('Invalid category'),
    body('supplierid').notEmpty().withMessage('Supplier is required')
        .isInt({ min: 1 }).withMessage('Invalid supplier'),
    body('stock').notEmpty().withMessage('Stock is required')
        .isInt({ min: 0 }).withMessage('Stock must be a positive integer'),
];


const categoriesController = {

    addBookForm: function(req,res) {
        res.render("addBookForm", {
            errorMessages: [],
            cssFile: "/addBookForm.css"
        })
    },

    addBook: asyncHandler(async function(req,res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            const errorMessages = errors.array().map(error => error.msg);
            res.render("addBookForm", { errorMessages }) // Add an alert message use views here
        }     

        const { title, author, ISBN, price, description, categoryid, supplierid, stock } = req.body;

        // Since we get everything from FORM in String
        const categoryIdInt = parseInt(categoryid, 10)
        const supplierIdInt = parseInt(supplierid, 10)
        const stockInt = parseInt(stock, 10)

        await db.addBook(title, author, ISBN, price, description, categoryIdInt, supplierIdInt, stockInt)
        res.redirect("/")
    })
    
}

module.exports = categoriesController