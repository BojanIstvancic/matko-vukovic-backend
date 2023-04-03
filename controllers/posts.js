const Post = require("../models/post");
const { StatusCodes } = require("http-status-codes");

const getAllPosts = async (req, res) => {
  // const posts = await Post.find({});
};

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const { userId } = req.user;

  console.log({ title, content, userId });

  // const post = await Post.create({ title, content, createdBy: userId  });

  // res.status(StatusCodes.CREATED).json({ post });
};

const getPost = async (req, res) => {
  res.send("get post");
};

const updatePost = async (req, res) => {
  res.send("update post");
};

const deletePost = async (req, res) => {
  res.send("delete post");
};

module.exports = {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
};
