

// const router = require("express").Router();
// const Booking = require("../models/Booking");
// const Listing = require("../models/Listing");
// const User = require("../models/User");

// /* CREATE BOOKING */
// router.post("/create", async (req, res) => {
//   try {
//     const { customerId, listingId, hostId, startDate, endDate, totalPrice, userDetails, paymentMethodId } = req.body;

//     const newBooking = new Booking({
//       customerId,
//       listingId,
//       hostId,
//       startDate,
//       endDate,
//       totalPrice,
//       userDetails,
//       paymentMethodId,
//     });

//     await newBooking.save();
//     await Listing.findByIdAndUpdate(listingId, { $push: { bookings: newBooking._id } });

//     res.status(201).json({ message: "Booking created successfully", bookingId: newBooking._id });
//   } catch (err) {
//     console.error("Error creating booking:", err);
//     res.status(500).json({ message: "Failed to create booking", error: err.message });
//   }
// });

// // Other booking routes can go here

// module.exports = router;












const router = require("express").Router();
const Booking = require("../models/Booking");
const Listing = require("../models/Listing");

/* CREATE BOOKING */
router.post("/create", async (req, res) => {
  try {
    const { customerId, listingId, hostId, startDate, endDate, totalPrice, userDetails, paymentMethodId } = req.body;

    // Check if the listing is already booked during the requested dates
    const existingBookings = await Booking.find({
      listingId: listingId,
      $or: [
        { startDate: { $lte: endDate }, endDate: { $gte: startDate } }
      ]
    });

    // If any bookings overlap with the requested time, reject the request
    if (existingBookings.length > 0) {
      return res.status(400).json({ message: "This listing is already booked for the requested dates." });
    }

    // Proceed with creating the booking if no conflicts
    const newBooking = new Booking({
      customerId,
      listingId,
      hostId,
      startDate,
      endDate,
      totalPrice,
      userDetails,
      paymentMethodId,
    });

    await newBooking.save();
    await Listing.findByIdAndUpdate(listingId, { $push: { bookings: newBooking._id } });

    res.status(201).json({ message: "Booking created successfully", bookingId: newBooking._id });
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ message: "Failed to create booking", error: err.message });
  }
});

module.exports = router;








