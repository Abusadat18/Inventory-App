const Router = require("express");
const booksController = require("../controllers/books.controller");

const booksRouter = Router()

booksRouter.get("/:bookid", booksController.showBookDetail)
booksRouter.get("/editBook/:bookid", booksController.showEditBook)
booksRouter.post("editBook/:bookid", booksController.editBook)

module.exports = booksRouter