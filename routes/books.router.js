const Router = require("express");
const booksController = require("../controllers/books.controller");
const { validateAddBook } = require("../middlewares/expressValidation");

const booksRouter = Router()

booksRouter.get("/:bookid", booksController.showBookDetail)
booksRouter.get("/editBook/:bookid", booksController.showEditBook) // This means edit book form from home page
booksRouter.post("/editBook/:bookid", validateAddBook, booksController.editBook) // This means edit book from home page
booksRouter.get("/details/editBook/:bookid", booksController.showEditBook) // THis means edit book form from detail page

module.exports = booksRouter