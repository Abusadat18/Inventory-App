const db = require("../db/query")
const asyncHandler = require("express-async-handler");

const homeController = asyncHandler (async function(req,res) {

    const allCategories = await db.getAllCategories() // We will get an array of objects
    const allBooks = await db.getAllBooks()

    res.render("index", {allCategories, allBooks})
})

module.exports = homeController