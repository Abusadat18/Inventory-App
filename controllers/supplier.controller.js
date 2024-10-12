const { validationResult } = require("express-validator");
const db = require("../db/query")
const asyncHandler = require("express-async-handler");

const supplierController = {
    showAllSuppliers: asyncHandler(async function(req,res){
        const allSuppliers = await db.getAllSuppliers()
        const allCategories = await db.getAllCategories()
        res.render("supplierInfo", {
            allSuppliers,
            allCategories,
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
        let supplierid = 0
        let supplier // Obj 
        if (checkPath){ 
            supplierid = +(req.params.supplierid) 
            supplier = await db.getSupplier(supplierid)
        }
        res.render("addSupplierForm", {
            errorMessages: [],
            cssFile: "/addSupplierForm.css",
            checkPath,
            supplier
        })
    }),

    addSupplier: asyncHandler(async function(req,res){
        const checkPath = req.path.includes("edit")
        let supplierid = 0
        let supplier = null
        if (checkPath){
            supplierid = +(req.params.supplierid)
            supplier = await db.getSupplier(supplierid)
        }
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            const errorMessages = errors.array().map(error => error.msg);
            return res.render("addSupplierForm", { 
                errorMessages,
                cssFile: "/addSupplierForm.css",
                checkPath,
                supplier 
            }) 
        } 

        const { suppliername, contact } = req.body
        console.log(supplierid);
        
        if (checkPath) {
            await db.updateSupplier(supplierid, suppliername, contact)
        } else {
            await db.addSupplier(suppliername, contact)
        }
        res.redirect("/suppliers")
    })
}

module.exports = supplierController