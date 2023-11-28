const express = require("express");
const router = express.Router();

const Categories = require('../models/Categoris')
const Columns = require('../models/Columns')
const Todos = require('../models/Todos')


router.post('/category/create', async (req, res) => {
  try {
    const { name, slug, color, columns, userId } = req.fields

    if (!name, !slug, !columns, !userId) {
      throw new Error('all fields are required (name, slug, columns, userId)')
    }

    const newCategory = new Categories({name, slug, color, columns, userId, created_at: Date.now(), updated_at: Date.now()})
    await newCategory.save()
    const categoryId = newCategory._id

    const todo = {
      title: "todo",
      taskTitle: "",
      showMenu: false,
      todos: [],
      categoryId,
      userId
    }
    const inProgress = {
      title: "in-Progress",
      taskTitle: "",
      showMenu: false,
      todos: [],
      categoryId,
      userId
    }
    const completed = {
      title: "completed",
      taskTitle: "",
      showMenu: false,
      todos: [],
      categoryId,
      userId
    }

    await Columns.insertMany([todo, inProgress, completed])
    // const allCategories = await Categories.find({userId}).sort({date: -1})
    // const allColumns = await Columns.find({userId})

    res.json(newCategory)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

router.get('/categories/:userId', async (req, res) => {
  try {
    const { userId } = req.params

    if (!userId) {
      throw new Error('Missing userId')
    }

    const allCategories = await Categories.find({userId}).sort({created_at: -1})
    const allColumns = await Columns.find({userId})
    const allTodos = await Todos.find({userId}).sort({created_at: -1})

    const categoriesWithColumns = allCategories.map((category) => {
      const columns = allColumns.filter(column => { 
        return column?.categoryId.toHexString() === category.id 
      })
      if (!category.id) {
        throw new Error(`Invalid category: ${JSON.stringify(category)}`)
      }

      return {
        id: category.id,
        name: category.name,
        slug: category.slug,
        color: category.color,
        columns: columns
      }
    })

    res.json({categoriesWithColumns, allCategories, allColumns, allTodos})
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.put('/category/update', async (req, res) => {
  try {
    const {  _id, name, slug, color } = req.fields

    if (!_id) {
      throw new Error('Missing _id')
    }
    const filter = { _id: _id };
    const update = { name, slug, color };

    // `doc` is the document _after_ `update` was applied because of
    // `new: true`
    const doc = await Categories.findOneAndUpdate(filter, update, {
      new: true
    });

    res.json(doc)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})


router.post('/category/delete', async (req, res) => {
  try {
    const { _id } = req.fields

    await Todos.deleteMany({categoryId: _id})
    await Columns.deleteMany({categoryId : _id})
    await Categories.findByIdAndDelete(_id)

    res.json(_id)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})


module.exports = router