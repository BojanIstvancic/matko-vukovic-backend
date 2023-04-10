const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "FirstName is required"],
      maxlength: 20,
    },
    lastName: {
      type: String,
      required: [true, "LastName is required"],
      maxlength: 20,
    },
    image: {
      type: String,
      required: [true, "Post image is required"],
    },
    role: {
      type: String,
      enum: [
        "director",
        "deputy",
        "professor",
        "secretary",
        "janitor",
        "pedagogue",
        "psychologist",
      ],
      default: ["professor"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user model"],
    },
    deletedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", EmployeeSchema);
