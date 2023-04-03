const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  // register function is not available in front-end
  const { name, password } = req.body;

  const user = await User.create({ name, password });

  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    // this will be solved on frondend - but this is added just in case
    return;
  }

  const user = await User.findOne({ name });

  if (!user) {
    return;
  }

  res.status(StatusCodes.OK).json({ user });
};

module.exports = {
  login,
  register,
};
