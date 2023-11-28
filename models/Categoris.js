const mongoose = require("mongoose");

const Categories = mongoose.model("Categories", {
  name: {
    type: String,
    default: "",
  },
  slug: {
    type: String,
    default: "",
  },
  color: {
    type: Object,
    default: {},
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

module.exports = Categories