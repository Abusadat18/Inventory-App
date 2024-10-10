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
        const book = await db.getBookDetail(bookid)
        const allCategories = await db.getAllCategories()
        const allSuppliers = await db.getAllSuppliers()

        return res.render("editBookForm", {
            book,
            cssFile: "/addBookForm.css",
            errorMessages: [],
            allCategories,
            allSuppliers
        })
    })
}

module.exports = booksController