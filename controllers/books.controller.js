const { validationResult } = require("express-validator");
const db = require("../db/query")
const asyncHandler = require("express-async-handler");

const booksController = {
    showBookDetail: asyncHandler(async function(req,res){
        const bookid = +(req.params.bookid)
        const book = await db.getBookDetail(bookid)

        return res.render("bookDetail", { 
            book,
            cssFile: "/bookDetail.css",
        })
    }),

    showEditBook: asyncHandler(async function(req,res){
        const bookid = +(req.params.bookid)
        // We are checking here so that we can post in 2 diff routes using one form
        const checkPath = req.path.includes("details")
        const book = await db.getBookDetail(bookid)
        const allCategories = await db.getAllCategories()
        const allSuppliers = await db.getAllSuppliers()

        return res.render("editBookForm", {
            book,
            cssFile: "/addBookForm.css",
            errorMessages: [],
            allCategories,
            allSuppliers,
            checkPath
        })
    }),

    editBook: asyncHandler(async function(req,res){
        const bookid = req.params.bookid
        console.log(req.path);
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            const errorMessages = errors.array().map(error => error.msg);
            const book = await db.getBookDetail(bookid)
            const allCategories = await db.getAllCategories() // We will get an array of objects
            const allSuppliers = await db.getAllSuppliers()

            return res.render("editBookForm", {
                book,
                cssFile: "/addBookForm.css",
                errorMessages,
                allCategories,
                allSuppliers
            })
        }

        const { title, author, ISBN, price, description, categoryid, supplierid, stock } = req.body;

        // Since we get everything from FORM in String
        const categoryIdInt = +categoryid
        const supplierIdInt = +supplierid
        const stockInt = +stock

        await db.editBook(bookid, title, author, ISBN, price, description, categoryIdInt, supplierIdInt, stockInt)
        res.redirect("/")
    }),

}

module.exports = booksController