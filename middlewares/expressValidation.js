const { body } = require("express-validator")

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

const validateSupplier = [
    body('suppliername')
        .trim()
        .notEmpty().withMessage('Supplier name is required')
        .matches(/^[a-zA-Z\s]+$/).withMessage('Supplier name can only contain letters and spaces'),

    body('contact')
        .trim()
        .notEmpty().withMessage('Contact number is required')
        .matches(/^[\d+\-]+$/).withMessage('Contact number can only contain numbers, +, and -')
];

module.exports = {
    validateAddBook,
    validateCategory,
    validateSupplier
}