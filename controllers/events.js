const { StatusCodes } = require("http-status-codes");

const getEvents = async (req, res) => {
  res.status(StatusCodes.OK).send("hello get events");
};

const createEvent = async (req, res) => {
  res.status(StatusCodes.OK).send("create event");
};

const getEvent = async (req, res) => {
  res.status(StatusCodes.OK).send("get event");
};

const updateEvent = async (req, res) => {
  res.status(StatusCodes.OK).send("update event");
};

const deleteEvent = async (req, res) => {
  res.status(StatusCodes.OK).send("delete event");
};

module.exports = {
  getEvents,
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
};
