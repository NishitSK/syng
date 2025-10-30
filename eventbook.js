const express = require("express");
const app = express();

app.use(express.json());

let events = [
  {
    id: 1,
    name: "Synergia: Opening Keynote",
    date: "2024-03-15",
    location: "Main Hall",
  },
  {
    id: 2,
    name: "Synergia: AI Workshop",
    date: "2024-03-15",
    location: "Room 201",
  },
  {
    id: 3,
    name: "Synergia: Web Dev Panel",
    date: "2024-03-15",
    location: "Main Hall",
  },
];

app.post("/events", (req, res) => {
  const { name, date, location } = req.body || {};
  const newEvent = {
    id: events.length ? events[events.length - 1].id + 1 : 1,
    name: name,
    date: date,
    location: location,
  };
  events.push(newEvent);
  res.status(201).send({ data: events, message: "Event created successfully" });
});

app.get("/events", (req, res) => {
  res
    .status(200)
    .send({ data: events, message: "Events retrieved successfully" });
});

app.post("/events/:id", (req, res) => {
  const { name, date, location } = req.body || {};
  const newEvent = {
    id: events.length + 1,
    name: req.body.name,
    date: req.body.date,
    location: req.body.location,
  };
  events.push(newEvent);
  res.status(201).send({ data: events, message: "Event created successfully" });
});

app.put("/events/:id", (req, res) => {
  const eventId = parseInt(req.params.id);
  const { name, date, location } = req.body || {};
  const findEvent = events.find((e) => e.id === eventId);
  if (!findEvent) {
    res.status(404).send({ message: "Event not found" });
    return;
  }
  if (name) findEvent.name = name;
  if (date) findEvent.date = date;
  if (location) findEvent.location = location;
  res.status(200).send({ data: events, message: "Event updated successfully" });
});

app.delete("/events/:id", (req, res) => {
  const eventId = parseInt(req.params.id);
  const eventIndex = events.findIndex((e) => e.id === eventId);
  if (eventIndex === -1) {
    return res.status(404).send({ message: "Event not found" });
  }

  events.splice(eventIndex, 1);

  res.status(200).send({ data: events, message: "Event deleted successfully" });
});

let bookings = [
  {
    id: 1,
    participantName: "Alice Smith",
    email: "alice@example.com",
    ticketType: "General",
  },
  {
    id: 2,
    participantName: "Bob Johnson",
    email: "bob@example.com",
    ticketType: "VIP",
  },
];

app.post("/bookings", (req, res) => {
  const { participantName, email, ticketType } = req.body || {};

  if (!participantName || !email) {
    return res
      .status(400)
      .send({ message: "Participant name and email are required" });
  }

  const newBooking = {
    id: bookings.length ? bookings[bookings.length - 1].id + 1 : 1,
    participantName: participantName,
    email: email,
    ticketType: ticketType || "General",
  };
  bookings.push(newBooking);
  res
    .status(201)
    .send({ data: newBooking, message: "Booking created successfully" });
});

app.get("/bookings", (req, res) => {
  res
    .status(200)
    .send({ data: bookings, message: "Bookings retrieved successfully" });
});

app.get("/bookings/:id", (req, res) => {
  const bookingId = parseInt(req.params.id);
  const findBooking = bookings.find((b) => b.id === bookingId);

  if (!findBooking) {
    return res.status(404).send({ message: "Booking not found" });
  }
  res
    .status(200)
    .send({ data: findBooking, message: "Booking retrieved successfully" });
});

app.put("/bookings/:id", (req, res) => {
  const bookingId = parseInt(req.params.id);
  const { participantName, email, ticketType } = req.body || {};

  const findBooking = bookings.find((b) => b.id === bookingId);

  if (!findBooking) {
    return res.status(404).send({ message: "Booking not found" });
  }

  if (participantName) findBooking.participantName = participantName;
  if (email) findBooking.email = email;
  if (ticketType) findBooking.ticketType = ticketType;

  res
    .status(200)
    .send({ data: findBooking, message: "Booking updated successfully" });
});

app.delete("/bookings/:id", (req, res) => {
  const bookingId = parseInt(req.params.id);
  const bookingIndex = bookings.findIndex((b) => b.id === bookingId);

  if (bookingIndex === -1) {
    return res.status(44).send({ message: "Booking not found" });
  }

  const deletedBooking = bookings.splice(bookingIndex, 1);
  res
    .status(200)
    .send({ data: deletedBooking[0], message: "Booking deleted successfully" });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
