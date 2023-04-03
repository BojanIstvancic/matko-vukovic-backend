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
      maxlength: 1000,
    },
    image: {
      data: Buffer,
      required: [true, "Post image is required"],
      contentType: String,
    },
    deletedTime: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
