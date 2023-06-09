const express = require("express");
const router = express.Router();

const authenticateUser = require("../middleware/authentication");

const {
  getEvents,
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");

router.route("/").get(getEvents).post(authenticateUser, createEvent);

router.route("/:id").get(getEvent).patch(updateEvent).delete(deleteEvent);

module.exports = router;
