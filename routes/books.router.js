const Router = require("express");
const booksController = require("../controllers/books.controller");
const { validateAddBook } = require("../middlewares/expressValidation");

const booksRouter = Router()

booksRouter.get("/:bookid", booksController.showBookDetail)
booksRouter.get("/editBook/:bookid", booksController.showEditBook) // This means edit book form from home page
booksRouter.post("/editBook/:bookid", validateAddBook, booksController.editBook) // This will redirect to home page
booksRouter.get("/details/editBook/:bookid", booksController.showEditBook) // This means edit book form from detail page
booksRouter.post("/details/editBook/:bookid", validateAddBook, booksController.editBook) // This will redirect to detail page

module.exports = booksRouter