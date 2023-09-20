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
  }
  
});

module.exports = Categories