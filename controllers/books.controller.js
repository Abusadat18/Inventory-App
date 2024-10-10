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
    })
}

module.exports = booksController