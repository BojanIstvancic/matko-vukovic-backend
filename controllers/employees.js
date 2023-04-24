const Employee = require("../models/Employee");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, InternalServerError } = require("../errors");

const getAllEmployees = async (req, res) => {
  const employees = await Employee.find({ deletedAt: null });

  if (!employees) {
    throw new InternalServerError("Something went wrong try again later");
  }

  res.status(StatusCodes.OK).json({ employees });
};

const createEmployee = async (req, res) => {
  const {
    body: { firstName, lastName, role },
    user: { userId },
  } = req;

  const url = req.protocol + "://" + req.get("host");

  const image = url + "/images/" + req.file.filename;

  if (!firstName || !lastName || !role || !image) {
    throw new BadRequestError(
      "Please provide first name, last name, role and image"
    );
  }

  const employee = await Employee.create({
    firstName,
    lastName,
    role,
    image,
    createdBy: userId,
  });

  if (!employee) {
    throw new InternalServerError("Something went wrong try again later");
  }

  res.status(StatusCodes.CREATED).json({ employee });
};

const getEmployee = async (req, res) => {
  res.send("get Employee");
};

const updateEmployee = async (req, res) => {
  res.send("update Employee");
};

const deleteEmployee = async (req, res) => {
  res.send("delete Employee");
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};
