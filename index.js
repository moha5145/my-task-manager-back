const express = require("express");
const mongoose = require('mongoose')
const formidable = require('express-formidable-v2')
const cors = require('cors')
require('dotenv').config()

const app = express();
app.use(formidable());

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200
}
app.use(cors(corsOptions))



const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}


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

//Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
})