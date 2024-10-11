const Router = require("express");
const booksController = require("../controllers/books.controller");
const { validateAddBook } = require("../middlewares/expressValidation");

const booksRouter = Router()

booksRouter.get("/:bookid", booksController.showBookDetail)
booksRouter.get("/editBook/:bookid", booksController.showEditBook)
booksRouter.post("/editBook/:bookid", validateAddBook, booksController.editBook)

module.exports = booksRouter