const express = require("express");
const formidable = require('express-formidable-v2')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')

const app = express();
app.use(formidable());
app.use(cors())
mongoose.connect(process.env.MONGODB_URI);

const categoriesRoute = require('./routes/categories')
app.use(categoriesRoute)

const columnsRoute = require('./routes/columns')
app.use(columnsRoute)

const todosRoute = require('./routes/todos');
app.use(todosRoute)

const userRoute = require('./routes/user')
app.use(userRoute)

app.all('*', (req, res) => {
  res.status(400).json({message: "Pages not found"})
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
