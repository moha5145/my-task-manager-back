const mongoose = require("mongoose");

const Columns = mongoose.model("Columns", {
    title: {
      type: String,
      default: "",
    },
    taskTitle: {
      type: String,
      default: "",
    },
    chowMenu: {
      type: Boolean,
      default: false
    },
    todos: {
      type: Array,
      default: [],
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categoryId"
    }
    
});

module.exports = Columns