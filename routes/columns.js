const express = require("express");
const router = express.Router();

const Categories = require('../models/Categoris')
const Columns = require('../models/Columns')
const Todos = require('../models/Todos')

router.post('/column/create', async (req, res) => {
  try {
    const { title, taskTitle, showMenu, todos, categoryId, userId} = req.fields
    const category = await Categories.findById(categoryId)
    const newColumn = new Columns({title, taskTitle, showMenu, todos, categoryId: category._id, userId})
    await newColumn.save()
    res.json(newColumn)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

router.put('/column/update', async (req, res) => {
  try {
    const { column, todosIds} = req.fields
    if (!column || !todosIds) {
      throw new Error('Invalid column or todosIds')     
    }

    const newColumn = await Columns.findById(column._id)
   
    if (!newColumn) {
      throw new Error('Column not found')
    }

    newColumn.title = column.title
    await newColumn.save() 

    // Update the status of todos associated with the column
    const filter = {_id: {$in: todosIds}}
    const update = {$set: {status: newColumn.title}}
    await Todos.updateMany(filter, update)

    res.json(newColumn)    
  } catch (error) {
    console.log('error', error)
    res.status(400).json({message: error.message})
  }
})

router.post('/column/delete', async (req, res) => {
  try {
    const {title, categoryId, columnId } = req.fields
    await Todos.deleteMany({categoryId, status: title})
    await Columns.findByIdAndDelete({_id: columnId})

    const allColumns = await Columns.find({categoryId})
    const allTodos = await Todos.find()
    res.json({allColumns, allTodos})
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

module.exports = router