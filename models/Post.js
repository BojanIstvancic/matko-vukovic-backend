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
      // minlength: 300,
      maxlength: 1000,
    },
    // image: {
    //   data: Buffer,
    //   required: [true, "Post image is required"],
    //   contentType: String,
    // },
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

module.exports = mongoose.model("Post", PostSchema);
