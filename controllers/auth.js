const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const { name, password, firstName, lastName, administrationLevel } = req.body;

  const user = await User.create({
    name,
    password,
    firstName,
    lastName,
    administrationLevel,
  });

  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    // this will be handled in frontend - added here just in case
    throw new BadRequestError("Please provide name and password");
  }

  const user = await User.findOne({ name });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Password");
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user, token });
};

module.exports = {
  login,
  register,
};
