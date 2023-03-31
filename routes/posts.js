const express = require("express");
const router = express.Router();

const {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/posts.js");

router.route("/").post(createPost).get(getAllPosts);
router.route("/:id").get(getPost).patch(updatePost).delete(deletePost);

module.exports = router;
