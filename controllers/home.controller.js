const db = require("../db/query")
const asyncHandler = require("express-async-handler");

const homeController = asyncHandler (async function(req,res) {

    const allCategories = await db.getAllCategories() // We will get an array of objects
    const allBooks = await db.getAllBooks()

    const categoryid = +(req.query.categoryid)

    if (categoryid){
        const books = await db.getBooksOfCategory(categoryid)

        res.render("index", {
            allCategories,
            allBooks: books,
            cssFile: "style.css",
            type: categoryid
        })
    } else {
        res.render("index", {
        allCategories, 
        allBooks,
        cssFile: "/style.css",
        type: "home"
    })
    }
})

module.exports = homeController