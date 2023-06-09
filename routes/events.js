const express = require("express");
const router = express.Router();

const {
  getEvents,
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");

router.route("/").get(getEvents).post(createEvent);

router.route("/:id").get(getEvent).patch(updateEvent).delete(deleteEvent);

module.exports = router;
