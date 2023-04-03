const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  // register function is not available in front-end
  const { name, password } = req.body;

  const user = await User.create({ name, password });

  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    // this will be handled in frontend - added here just in case
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ name });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  res.status(StatusCodes.OK).json({ user });
};

module.exports = {
  login,
  register,
};
