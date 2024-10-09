const Router = require("express");
const categoriesController = require("../controllers/categories.controller");

const categoriesRouter = Router()

categoriesRouter.get("/addBook", categoriesController.addBookForm);
categoriesRouter.post("/addBook",categoriesController.addBook)

module.exports = categoriesRouter