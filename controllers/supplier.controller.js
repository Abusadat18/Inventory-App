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
    })
}

module.exports = supplierController