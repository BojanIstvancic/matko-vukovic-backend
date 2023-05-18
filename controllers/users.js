const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, InternalServerError } = require("../errors");

const getUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new BadRequestError("Please provide users id");
  }

  const user = await User.findOne({ _id: id });

  if (!user) {
    throw new NotFoundError("User with provided id doesn't exist");
  }

  res.status(StatusCodes.OK).json({
    user: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      administrationLevel: user.administrationLevel,
    },
  });
};

const getUsers = async (req, res) => {
  const users = await User.find();

  if (!users) {
    throw new InternalServerError(
      "Something went wrong, please try again later."
    );
  }

  res.status(StatusCodes.OK).json({ users });
};

module.exports = {
  getUser,
  getUsers,
};
