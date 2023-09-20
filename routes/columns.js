const express = require("express");
const router = express.Router();

const Categories = require('../models/Categoris')
const Columns = require('../models/Columns')
const Todos = require('../models/Todos')

router.post('/column/create', async (req, res) => {
  try {
    const { title, taskTitle, showMenu, todos, categoryId} = req.fields
    const category = await Categories.findById(categoryId)
    const newColumns = new Columns({title, taskTitle, showMenu, todos, categoryId: category.id})
    await newColumns.save()
    res.json(newColumns)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

router.post('/column/delete', async (req, res) => {
  try {
    const {title, categoryId, _id } = req.fields
    await Todos.deleteMany({categoryId: categoryId, status: title})
    await Columns.findByIdAndDelete({_id})

    const allColumns = await Columns.find({categoryId})
    const allTodos = await Todos.find()
    res.json({allColumns, allTodos})
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

module.exports = router