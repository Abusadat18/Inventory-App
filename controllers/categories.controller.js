const db = require("../db/query")
const asyncHandler = require("express-async-handler");
const { validationResult } = require('express-validator');


const categoriesController = {

    addBookForm: asyncHandler (async function(req,res) {
        
        const allCategories = await db.getAllCategories() // We will get an array of objects
        const allSuppliers = await db.getAllSuppliers()
        
        res.render("addBookForm", {
            errorMessages: [],
            cssFile: "/addForm.css",
            allCategories,
            allSuppliers,
            type: "addBook"
        })
    }),

    addBook: asyncHandler(async function(req,res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            const errorMessages = errors.array().map(error => error.msg);
            const allCategories = await db.getAllCategories() // We will get an array of objects
            const allSuppliers = await db.getAllSuppliers()
        
            return res.render("addBookForm", {
                errorMessages,
                cssFile: "/addForm.css",
                allCategories,
                allSuppliers,
                type: "addBook"
            })
        }     

        const { title, author, ISBN, price, description, categoryid, supplierid, stock } = req.body;

        // Since we get everything from FORM in String
        const categoryIdInt = +categoryid
        const supplierIdInt = +supplierid
        const stockInt = +stock

        await db.addBook(title, author, ISBN, price, description, categoryIdInt, supplierIdInt, stockInt)
        res.redirect("/")
    }),

    addCategoryForm: asyncHandler(async function(req,res){   // Add and Edit Category logic
        const checkPath = req.path.includes("edit")
        let categoryid = 0
        let category
        if (checkPath) categoryid = req.params.categoryid
        if (categoryid) {
            category = await db.getCategory(categoryid)
        }

        const allCategories = await db.getAllCategories()

        res.render("addCategoryForm", {
            errorMessages: [],
            cssFile: "/addForm.css",
            checkPath,
            category,
            allCategories,
            type: "category"
        })   
    }),

    addCategory: asyncHandler(async function(req,res){
        const errors = validationResult(req)
        const checkPath = req.path.includes("edit")
        if (!errors.isEmpty()){
            const errorMessages = errors.array().map(error => error.msg);
            const allCategories = await db.getAllCategories()
            return res.render("addCategoryForm", { 
                errorMessages,
                cssFile: "/addForm.css",
                allCategories,
                checkPath,
                type: "category" 
            }) 
        } 
        
        const { title } = req.body

        await db.addCategory(title)
        res.redirect("/")
        
    }),
    deleteCategory: asyncHandler(async function(req,res){
        const categoryid = +(req.params.categoryid)
        await db.deleteCategory(categoryid)
        res.redirect("/")
    }),

    editCategory: asyncHandler(async function(req,res){
        const categoryid = +(req.params.categoryid)
        const checkPath = req.path.includes("edit")
        const errors = validationResult(req)
        const category = await db.getCategory(categoryid)
        if (!errors.isEmpty()){
            const errorMessages = errors.array().map(error => error.msg);
            const allCategories = await db.getAllCategories()
            return res.render("addCategoryForm", { 
                errorMessages,
                cssFile: "/addForm.css",
                category,
                allCategories,
                checkPath,
                type: "category" 
            }) 
        }
        
        const { title } = req.body
        
        await db.updateCategory(categoryid, title)
        res.redirect("/")
    })
}

module.exports = categoriesController