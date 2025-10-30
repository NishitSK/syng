const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // to parse JSON body

// MongoDB connection
const connectDb = 'mongodb+srv://nishit:bladeformation1@cluster0.hjd9p.mongodb.net/';
mongoose.connect(connectDb)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Default route
app.get('/', (req, res) => {
  res.send('Booking API is running...');
});

// Schema & Model
const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  event: String,
  ticketType: String,
  createdAt: { type: Date, default: Date.now }
});
const BookingModel = mongoose.model('Booking', bookingSchema);

//
// 🟢 CREATE Booking (POST)
// Endpoint: /api/bookings
//
app.post('/api/bookings', async (req, res) => {
  try {
    const data = req.body;
    const { name, email, event, ticketType } = data;

    // Validate required fields
    if (!name || !email || !event) {
        return res.status(400).json({ error: "Name, email, and event are required fields" });
    }

    // Email validation (re-using your regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    
    // Note: Removed the uniqueness check from your original code
    // as it wasn't in the new requirements.

    const mydata = await BookingModel.create({
      name,
      email,
      event,
      ticketType
    });

    return res.status(201).json({
      message: "Booking created successfully",
      data: mydata
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

//
// 🔵 READ All Bookings (GET)
// Endpoint: /api/bookings
//
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await BookingModel.find();
    return res.status(200).json({ data: bookings });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

//
// 🔵 READ Bookings by Email (GET) - SEARCH
// Endpoint: /api/bookings/search?email=xyz
//
app.get('/api/bookings/search', async (req, res) => {
    try {
      const { email } = req.query; // Get email from query parameter

      if (!email) {
        return res.status(400).json({ error: "Email query parameter is required" });
      }

      // Find all bookings matching the email
      const bookings = await BookingModel.find({ email: email });
      
      return res.status(200).json({ data: bookings });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
});

//
// 🔵 READ Bookings by Event (GET) - FILTER
// Endpoint: /api/bookings/filter?event=Synergia
//
app.get('/api/bookings/filter', async (req, res) => {
    try {
      const { event } = req.query; // Get event from query parameter

      if (!event) {
        return res.status(400).json({ error: "Event query parameter is required" });
      }

      // Find all bookings matching the event
      const bookings = await BookingModel.find({ event: event });
      
      return res.status(200).json({ data: bookings });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
});

//
// 🔵 READ Single Booking by ID (GET)
// Endpoint: /api/bookings/:id
//
app.get('/api/bookings/:id', async (req, res) => {
  try {
    const id = req.params.id;
    // findById is the standard way to search by Mongoose _id
    const booking = await BookingModel.findById(id); 
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    return res.status(200).json({ data: booking });
  } catch (err) {
    // This will also catch errors for invalidly formatted IDs
    return res.status(500).json({ error: err.message });
  }
});

//
// 🟠 UPDATE Booking (PUT)
// Endpoint: /api/bookings/:id
//
app.put('/api/bookings/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    // Following your style of checking existence first
    const booking = await BookingModel.findById(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    const updatedBooking = await BookingModel.findByIdAndUpdate(
      id,
      updates,
      { new: true } // This returns the updated document
    );

    return res.status(200).json({
      message: "Booking data updated successfully",
      data: updatedBooking
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

//
// 🔴 DELETE Booking (DELETE)
// Endpoint: /api/bookings/:id
//
app.delete('/api/bookings/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Following your style of checking existence first
    const booking = await BookingModel.findById(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Following your style of using deleteOne
    await BookingModel.deleteOne({ _id: id });

    return res.status(200).json({ message: "Booking deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

//
// Server Start
//
app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});