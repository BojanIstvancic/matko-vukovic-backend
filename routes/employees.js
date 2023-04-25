const express = require("express");
const router = express.Router();

const {
  createEmployee,
  getAllEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employees.js");

const authenticateUser = require("../middleware/authentication");

const upload = require("../middleware/upload-image");

router
  .route("/")
  .post(authenticateUser, upload.single("staff_image"), createEmployee)
  .get(getAllEmployees);
router
  .route("/:id")
  .get(getEmployee)
  .patch(updateEmployee)
  .delete(authenticateUser, deleteEmployee);

module.exports = router;
