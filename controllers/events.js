const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const Event = require("../models/Event");

const getEvents = async (req, res) => {
  const events = await Event.find({ deletedAt: null }).sort("-createdAt");

  if (!events) {
    throw new InternalServerError("Something went wrong try again later");
  }

  res.status(StatusCodes.OK).json({ events });
};

const createEvent = async (req, res) => {
  const {
    body: { type, date, info, subjectsAffected },
    user: { userId },
  } = req;

  if (!type || !date || !info || !subjectsAffected) {
    throw new BadRequestError(
      "Please provide type, date, info and subjects affected"
    );
  }

  const event = await Event.create({
    type,
    date,
    info,
    subjectsAffected,
    createdBy: userId,
  });

  if (!event) {
    throw new InternalServerError("Something went wrong try again later");
  }

  res.status(StatusCodes.CREATED).json({ event });
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
