const Post = require("../models/post");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, InternalServerError } = require("../errors");

const getAllPosts = async (req, res) => {
  const posts = await Post.find();

  if (!posts) {
    throw new InternalServerError("Something went wrong try again later");
  }

  console.log(posts[0].image);

  res.status(StatusCodes.OK).json({ posts });
};

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const { userId } = req.user;
  const image = {
    data: req.file.filename,
    contentType: req.file.mimetype,
  };

  if (!title || !content || !image) {
    throw new BadRequestError("Please provide title, content and image");
  }

  const post = await Post.create({ title, content, image, createdBy: userId });

  if (!post) {
    throw new InternalServerError("Something went wrong try again later");
  }

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
