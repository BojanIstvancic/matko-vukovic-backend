const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["info", "dayOff", "exam"],
      default: ["info"],
    },
    date: {
      type: Date,
    },
    info: {
      type: String,
      required: [true, "Post image is required"],
      minlength: 20,
    },
    subjectsAffected: {
      type: String,
      enum: [
        "all",
        "1a",
        "1b",
        "1c",
        "1d",
        "2a",
        "2b",
        "2c",
        "2d",
        "3a",
        "3b",
        "3c",
        "3d",
        "4a",
        "4b",
        "4c",
        "4d",
        "5a",
        "5b",
        "5c",
        "5d",
        "6a",
        "6b",
        "6c",
        "6d",
        "7a",
        "7b",
        "7c",
        "7d",
        "8a",
        "8b",
        "8c",
        "8d",
      ],
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

module.exports = mongoose.model("Event", EventSchema);
