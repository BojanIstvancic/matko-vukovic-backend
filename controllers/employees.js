const getAllEmployees = async (req, res) => {
  res.send("get all Employees");
};

const createEmployee = async (req, res) => {
  res.send("create Employee");
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
