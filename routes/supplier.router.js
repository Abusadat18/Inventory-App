const { Router } = require("express")
const supplierController = require("../controllers/supplier.controller")
const { validateSupplier } = require("../middlewares/expressValidation")

const supplierRouter = Router()

supplierRouter.get("/", supplierController.showAllSuppliers)
supplierRouter.get("/delete/:supplierid", supplierController.deleteSupplier)
supplierRouter.get("/addSupplier", supplierController.showAddSupplierForm)
supplierRouter.post("/addSupplier", validateSupplier, supplierController.addSupplier)
supplierRouter.get("/edit/:supplierid", supplierController.showAddSupplierForm) // 2 routes one func
supplierRouter.post("/edit/:supplierid",validateSupplier, supplierController.addSupplier) // 2 routes one func

module.exports = supplierRouter