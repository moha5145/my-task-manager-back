const express = require("express");
const router = express.Router();

const Categories = require('../models/Categoris')
const Columns = require('../models/Columns')
const Todos = require('../models/Todos')


router.post('/todo/create', async (req, res) => {
  try {
    
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

router.put('/todo/update', async (req, res) => {
  try {
    const {_id, title, details, dueDate, expanded, priority, status, columnId } = req.fields || {}
    console.log('columnId ss', columnId)
    if (!_id) {
      throw new Error('Missing _id')
    }
    
    const todo = await Todos.findById(_id)
    
    if (!todo) {
      throw new Error('Todo not found')
    }
    
    if (title) {
      todo.title = title
    }
    
    // if (details) {
      todo.details = details
    // }
    
    // if (dueDate) {
      todo.dueDate = dueDate
    // } 
    // if (expanded) {
      todo.expanded = expanded
    // }
    
    // if (priority) {
      todo.priority = priority
    // }
    
    // if (status) {
      todo.status = status
    // }

    todo.columnId = columnId
    
    await todo.save()
    res.json(todo)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

router.put('/todos/update/all', async (req, res) => {
  try {
    const { updatedTodos } = req.fields
    const todosIds = updatedTodos.map(todo => todo._id)
    const filter = {_id: {$in: todosIds}}

    const updates = updatedTodos.map(todo => ({
      updateOne: {
        filter: {_id: todo._id},
        update: {$set: todo}
      }
    }))

    await Todos.bulkWrite(updates)
    const todos = await Todos.find(filter)

    res.json(todos)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

router.post('/todo/delete', async (req, res) => {
  try {
    const {_id } = req.fields
    await Todos.findByIdAndDelete(_id)
   
    const allTodos = await Todos.find()
    res.json({allTodos})
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

router.delete('/todos/delete/:columnId', async (req, res) => {
  try {
    console.log('req.params', req.params)
    const { columnId } = req.params
    const todos = await Todos.deleteMany({columnId})
   
    // const allTodos = await Todos.find()
    res.json(todos)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})


module.exports = router