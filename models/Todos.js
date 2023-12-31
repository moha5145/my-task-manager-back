const mongoose = require("mongoose");

const Todos = mongoose.model("Todos", {
  title: {
    type: String,
    default: "",
  },
  details: {
    type: String,
    default: "",
  },
  dueDate: {
    type: String,
    default: "",
  },
  expanded: {
    type: Boolean,
    default: false
  },
  isDragging: {
    type: Boolean,
    default: false
  },
  isEditing: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    default: "aucune",
  },
  status: {
    type: String,
    default: "",
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categoryId"
  },
  columnId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "columnId"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userId"
  },
  created_at: {
    type: Date, default: Date.now
  },
  updated_at: {
    type: Date, default: Date.now
  }
});

module.exports = Todos