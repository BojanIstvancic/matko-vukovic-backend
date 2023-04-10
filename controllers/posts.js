const Post = require("../models/post");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} = require("../errors");

const getAllPosts = async (req, res) => {
  const { limit } = req.query;

  const posts = await Post.find({ deletedAt: null })
    .limit(Number(limit))
    .sort("-createdAt");

  if (!posts) {
    throw new InternalServerError("Something went wrong try again later");
  }

  res.status(StatusCodes.OK).json({ posts });
};

const createPost = async (req, res) => {
  const {
    body: { title, content },
    user: { userId },
  } = req;

  const url = req.protocol + "://" + req.get("host");
  const image = url + "/images/" + req.file.filename;

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
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post || post.deletedAt !== undefined) {
    throw new InternalServerError("Something went wrong try again later");
  }

  res.status(StatusCodes.OK).json({ post });
};

const updatePost = async (req, res) => {
  const {
    body: { title, content },
    user: { userId },
    params: { id },
  } = req;

  const url = req.protocol + "://" + req.get("host");
  const image = url + "/images/" + req.file.filename;

  if (!title || !content || !image) {
    throw new BadRequestError("Please provide title, content and image");
  }

  const post = await Post.findByIdAndUpdate(
    {
      _id: id, // filter
    },
    {
      title,
      content,
      image,
      updatedBy: userId,
    },
    { new: true, runValidators: true }
  );

  if (!post) {
    throw new InternalServerError("Something went wrong try again later");
  }

  res.status(StatusCodes.OK).json({ post });
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  const post = await Post.findByIdAndUpdate(
    {
      _id: id, // filter
    },
    { deletedAt: new Date().toJSON() }, // update
    { new: true, runValidators: true } // return modified document
  );

  if (!post) {
    throw NotFoundError(`No task with the id: ${id}`);
  }

  res.status(StatusCodes.OK).json({ post });
};

module.exports = {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
};
