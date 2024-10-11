const express = require("express");
const homeRouter = require("./routes/home.router");
const app = express();
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");
const categoriesRouter = require("./routes/categories.router");
const booksRouter = require("./routes/books.router");
const supplierRouter = require("./routes/supplier.router");

require('dotenv').config()

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Common Middlewares
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRouter)
app.use("/categories", categoriesRouter)
app.use("/books", booksRouter)
app.use("/suppliers", supplierRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`My first Express app - listening on port ${PORT}!`));
