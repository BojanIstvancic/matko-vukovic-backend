const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const getUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new BadRequestError("Please provide users id");
  }

  const user = await User.findOne({ _id: id });

  if (!user) {
    throw new UnauthenticatedError("User with provided id doesn't exist");
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

module.exports = {
  getUser,
};
