const { validationResult } = require("express-validator");
const db = require("../db/query")
const asyncHandler = require("express-async-handler");

const supplierController = {
    showAllSuppliers: asyncHandler(async function(req,res){
        const allSuppliers = await db.getAllSuppliers()
        res.render("supplierInfo", {
            allSuppliers,
            cssFile: "/supplierInfo.css"
        })
    }),

    deleteSupplier: asyncHandler(async function(req,res){
        const supplierid = +(req.params.supplierid)
        await db.deleteSupplier(supplierid)
        res.redirect("/suppliers")
    }),

    showAddSupplierForm: asyncHandler(async function(req,res){
        const checkPath = req.path.includes("edit")

        res.render("addSupplierForm", {
            errorMessages: [],
            cssFile: "/addSupplierForm.css",
            checkPath
        })
    }),

    addSupplier: asyncHandler(async function(req,res){
        const checkPath = req.path.includes("edit")
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            const errorMessages = errors.array().map(error => error.msg);
            return res.render("addSupplierForm", { 
                errorMessages,
                cssFile: "/addSupplierForm.css" 
            }) 
        } 

        const { suppliername, contact } = req.body

        if (checkPath) {

        } else {
            await db.addSupplier(suppliername, contact)
            res.redirect("/suppliers")
        }
    })
}

module.exports = supplierController