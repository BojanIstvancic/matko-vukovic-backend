const express = require("express");
const router = express.Router();

const authenticateUser = require("../middleware/authentication");

const {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/posts.js");

const upload = require("../middleware/upload-image");

router
  .route("/")
  .post(authenticateUser, upload.single("uploaded_file"), createPost)
  .get(getAllPosts);

router.route("/:id").get(getPost).patch(updatePost).delete(deletePost);

module.exports = router;
