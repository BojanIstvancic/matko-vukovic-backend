const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
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
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    minlength: 3,
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
    minlength: 3,
  },
  administrationLevel: {
    type: String,
    enum: ["basic", "admin", "super"],
    default: ["basic"],
  },
});

UserSchema.pre("save", async function () {
  // crypt password before adding to database
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  // compare password in process of validation
  const isMatch = await bcrypt.compare(candidatePassword, this.password);

  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
