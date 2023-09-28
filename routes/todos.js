const express = require("express");
const router = express.Router();

const Categories = require('../models/Categoris')
const Columns = require('../models/Columns')
const Todos = require('../models/Todos')


router.post('/todo/create', async (req, res) => {
  try {
    console.log('req.fields', req.fields)
  //   const {newTodos} = req.fields
  //   const filterdTodos = newTodos.filter((todo) => {
  //     delete todo._id
  //     return todo
  //   })

  // const todos = await Todos.insertMany(filterdTodos);
    const todo = new Todos(req.fields)
    await todo.save()
    res.json(todo)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

router.post('/todo/delete', async (req, res) => {
  try {
    console.log('req.fields', req.fields)
    const {_id } = req.fields
    await Todos.findByIdAndDelete(_id)
    // await Columns.findByIdAndDelete({_id})

    // const allColumns = await Columns.find({categoryId})
    const allTodos = await Todos.find()
    res.json({allTodos})
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})


module.exports = router