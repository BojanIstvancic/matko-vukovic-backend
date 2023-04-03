const mongoose = require("mongoose");

const UserShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: 5,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
  },
});

module.exports = mongoose.model("User", UserShema);
