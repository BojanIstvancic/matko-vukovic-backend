const express = require("express");
const router = express.Router();

const { getUser, getUsers } = require("../controllers/users");

router.route("/").get(getUsers);
router.route("/:id").get(getUser);

module.exports = router;
