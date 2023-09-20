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
  priority: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "",
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categoryId"
  }
});

module.exports = Todos