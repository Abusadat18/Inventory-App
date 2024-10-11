const { Router } = require("express")
const supplierController = require("../controllers/supplier.controller")

const supplierRouter = Router()

supplierRouter.get("/", supplierController.showAllSuppliers)
supplierRouter.get("/delete/:supplierid", supplierController.deleteSupplier)
supplierRouter.get("/addSupplier", supplierController.showAddSupplierForm)
supplierRouter.post("/addSupplier", supplierController.addSupplier)
supplierRouter.get("/edit/:supplierid", supplierController.showAddSupplierForm) // 2 routes one func

module.exports = supplierRouter