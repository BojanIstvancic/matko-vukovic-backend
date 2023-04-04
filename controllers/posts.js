const Post = require("../models/post");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

const getAllPosts = async (req, res) => {
  // const posts = await Post.find({});
};

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const { userId } = req.user;
  const image = {
    data: req.file.filename,
  };

  if (!title || !content || !image) {
    throw new BadRequestError("Please provide title, content and image");
  }

  const post = await Post.create({ title, content, image, createdBy: userId });

  res.status(StatusCodes.CREATED).json({ post });
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
