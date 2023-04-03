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
    // image: {
    //   data: Buffer,
    //   required: [true, "Post image is required"],
    //   contentType: String,
    // },
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
    deletedTime: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", EmployeeSchema);
