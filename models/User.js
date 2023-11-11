const mongoose = require("mongoose");

const User = mongoose.model("User", {
    userName: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        unique: true
    },
    hash: String,
    salt: String,
    token: String
})

module.exports = User