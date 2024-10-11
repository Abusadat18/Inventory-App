const Router = require("express");
const categoriesController = require("../controllers/categories.controller");
const { validateAddBook, validateCategory } = require("../middlewares/expressValidation.js")

const categoriesRouter = Router()

categoriesRouter.get("/addBook", categoriesController.addBookForm)
categoriesRouter.post("/addBook", validateAddBook, categoriesController.addBook)

categoriesRouter.get("/addCategory", categoriesController.addCategoryForm)
categoriesRouter.post("/addCategory", validateCategory ,categoriesController.addCategory)

categoriesRouter.get("/delete/:categoryid", categoriesController.deleteCategory)

categoriesRouter.get("/edit/:categoryid", categoriesController.addCategoryForm) // We will check using "include" and provide separate values in the "value" of input
categoriesRouter.post("/edit/:categoryid", validateCategory, categoriesController.editCategory)  // We will post in 2 diff routes using one 

module.exports = categoriesRouter