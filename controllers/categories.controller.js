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

const validateCategory = [
    body('title')
        .notEmpty().withMessage('Category title is required') // Check that title is not empty
        .isString().withMessage('Category title must be a string') // Check that it is a string
        .trim() // Remove whitespace from both sides
        .isLength({ min: 1, max: 50 }).withMessage('Category title must be between 1 and 50 characters') // Limit the length of the title
        .matches(/^[a-zA-Z\s]+$/).withMessage('Category title must not contain special characters or numbers') // Allow only letters and spaces
];

const categoriesController = {

    addBookForm: asyncHandler (async function(req,res) {
        
        const allCategories = await db.getAllCategories() // We will get an array of objects
        const allSuppliers = await db.getAllSuppliers()
        
        res.render("addBookForm", {
            errorMessages: [],
            cssFile: "/addBookForm.css",
            allCategories,
            allSuppliers
        })
    }),

    addBook: asyncHandler(async function(req,res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            const errorMessages = errors.array().map(error => error.msg);
            res.render("addBookForm", { errorMessages }) // Add an alert message use views here
        }     

        const { title, author, ISBN, price, description, categoryid, supplierid, stock } = req.body;

        // Since we get everything from FORM in String
        const categoryIdInt = +categoryid
        const supplierIdInt = +supplierid
        const stockInt = +stock

        await db.addBook(title, author, ISBN, price, description, categoryIdInt, supplierIdInt, stockInt)
        res.redirect("/")
    }),

    addCategoryForm: asyncHandler(async function(req,res){
        res.render("addCategoryForm", {
            errorMessages: [],
            cssFile: "/addCategoryForm.css"
        })   
    }),

    addCategory: asyncHandler(async function(req,res){
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            const errorMessages = errors.array().map(error => error.msg);
            res.render("addCategoryForm", { errorMessages }) // Add an alert message use views here
        }   
        
        const { title } = req.body

        await db.addCategory(title)
        res.redirect("/")
    })
    
}

module.exports = categoriesController