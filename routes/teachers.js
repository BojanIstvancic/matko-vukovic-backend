const express = require("express");
const router = express.Router();

const {
  createTeacher,
  getAllTeachers,
  getTeacher,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teachers.js");

router.route("/").post(createTeacher).get(getAllTeachers);
router.route("/:id").get(getTeacher).patch(updateTeacher).delete(deleteTeacher);

module.exports = router;
