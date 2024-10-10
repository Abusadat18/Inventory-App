const Router = require("express");
const categoriesController = require("../controllers/categories.controller");

const categoriesRouter = Router()

categoriesRouter.get("/addBook", categoriesController.addBookForm)
categoriesRouter.post("/addBook",categoriesController.addBook)

categoriesRouter.get("/addCategory", categoriesController.addCategoryForm)
categoriesRouter.post("/addCategory", categoriesController.addCategory)

module.exports = categoriesRouter