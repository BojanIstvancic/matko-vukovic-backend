const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const Event = require("../models/Event");

const getEvents = async (req, res) => {
  const cutOffDate = new Date();
  cutOffDate.setDate(cutOffDate.getDate() - 1);

  const events = await Event.find({
    deletedAt: null,
    date: { $gt: cutOffDate },
  });

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
  const { id } = req.params;

  const event = await Event.findById(id);

  if (!event || event.event !== undefined) {
    throw new InternalServerError("Something went wrong try again later");
  }

  res.status(StatusCodes.OK).json({ event });
};

const updateEvent = async (req, res) => {
  const {
    body: { type, date, info, subjectsAffected },
    user: { userId },
    params: { id },
  } = req;

  if (!type || !date || !info || !subjectsAffected) {
    throw new BadRequestError(
      "Please provide type, date, info and subjects affected"
    );
  }

  const event = await Event.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      type,
      date,
      info,
      subjectsAffected,
      updatedBy: userId,
    },
    { new: true, runValidators: true }
  );

  if (!event) {
    throw new InternalServerError("Something went wrong try again later");
  }

  res.status(StatusCodes.OK).json({ event });
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;

  const event = await Event.findByIdAndUpdate(
    {
      _id: id,
    },
    { deletedAt: new Date().toJSON() },
    { new: true, runValidators: true }
  );

  if (!event) {
    throw NotFoundError(`No event with the id: ${id}`);
  }

  res.status(StatusCodes.OK).json({ event });
};

module.exports = {
  getEvents,
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
};
