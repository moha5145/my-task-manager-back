const express = require("express");
const formidable = require('express-formidable')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express();
app.use(formidable());
app.use(cors())
mongoose.connect("mongodb://localhost:27017/my-task-manager");


const categoriesRoute = require('./routes/categories')
app.use(categoriesRoute)

const columnsRoute = require('./routes/columns')
app.use(columnsRoute)

const todosRoute = require('./routes/todos');
app.use(todosRoute)


app.all('*', (req, res) => {
  res.status(400).json({message: "Pages not found"})
})
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
