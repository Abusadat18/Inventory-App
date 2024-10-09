const express = require("express");
const homeRouter = require("./routes/home.router");
const app = express();
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");
const categoriesRouter = require("./routes/categories.router");

require('dotenv').config()

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Common Middlewares
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRouter)
app.use("/categories", categoriesRouter)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`My first Express app - listening on port ${PORT}!`));
