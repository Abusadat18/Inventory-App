const { Router } = require("express")
const supplierController = require("../controllers/supplier.controller")

const supplierRouter = Router()

supplierRouter.get("/", supplierController.showAllSuppliers)

module.exports = supplierRouter