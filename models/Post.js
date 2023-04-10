const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post title is required"],
      maxlength: 50,
    },
    content: {
      type: String,
      required: [true, "Post content is required"],
      minlength: 300,
    },
    image: {
      type: String,
      required: [true, "Post image is required"],
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

module.exports = mongoose.model("Post", PostSchema);
