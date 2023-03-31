const getAllTeachers = async (req, res) => {
  res.send("get all teachers");
};

const createTeacher = async (req, res) => {
  res.send("create teacher");
};

const getTeacher = async (req, res) => {
  res.send("get teacher");
};

const updateTeacher = async (req, res) => {
  res.send("update teacher");
};

const deleteTeacher = async (req, res) => {
  res.send("delete teacher");
};

module.exports = {
  createTeacher,
  getAllTeachers,
  getTeacher,
  updateTeacher,
  deleteTeacher,
};
