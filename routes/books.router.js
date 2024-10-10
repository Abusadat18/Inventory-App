const Router = require("express");
const booksController = require("../controllers/books.controller");

const booksRouter = Router()

booksRouter.get("/:bookid", booksController.showBookDetail)

module.exports = booksRouter