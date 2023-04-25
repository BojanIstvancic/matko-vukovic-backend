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
  const { id } = req.params;

  const employee = await Employee.findById(id);

  if (!employee || employee.deletedAt !== undefined) {
    throw new InternalServerError("Something went wrong try again later");
  }

  res.status(StatusCodes.OK).json({ employee });
};

const updateEmployee = async (req, res) => {
  const {
    body: { firstName, lastName, role, staff_image },
    user: { userId },
    params: { id },
  } = req;

  let image = staff_image;

  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    image = url + "/images/" + req.file.filename;
  }

  if (!firstName || !lastName || !role) {
    throw new BadRequestError("Please provide title, content and image");
  }

  const employee = await Employee.findByIdAndUpdate(
    {
      _id: id, // filter
    },
    {
      firstName,
      lastName,
      role,
      image,
      updatedBy: userId,
    },
    { new: true, runValidators: true }
  );

  if (!employee) {
    throw new InternalServerError("Something went wrong try again later");
  }

  res.status(StatusCodes.OK).json({ employee });
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  const employee = await Employee.findByIdAndUpdate(
    {
      _id: id, // filter
    },
    { deletedAt: new Date().toJSON() }, // update
    { new: true, runValidators: true } // return modified document
  );

  if (!employee) {
    throw NotFoundError(`No employee with the id: ${id}`);
  }

  res.status(StatusCodes.OK).json({ employee });
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};
