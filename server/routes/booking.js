// const router = require("express").Router()

// const Booking = require("../models/Booking")

// /* CREATE BOOKING */
// router.post("/create", async (req, res) => {
//   try {
//     const { customerId, hostId, listingId, startDate, endDate, totalPrice } = req.body
//     const newBooking = new Booking({ customerId, hostId, listingId, startDate, endDate, totalPrice })
//     await newBooking.save()
//     res.status(200).json(newBooking)
//   } catch (err) {
//     console.log(err)
//     res.status(400).json({ message: "Fail to create a new Booking!", error: err.message })
//   }
// })

// module.exports = router








const router = require("express").Router();
const Booking = require("../models/Booking");
const Listing = require("../models/Listing");
const User = require("../models/User");

/* CREATE BOOKING */
router.post("/create", async (req, res) => {
  try {
    const { customerId, listingId, hostId, startDate, endDate, totalPrice, userDetails, paymentMethodId } = req.body;

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

// Other booking routes can go here

module.exports = router;











// // booking.js
// const express = require("express");
// const router = express.Router();
// const Booking = require("../models/Booking");
// const stripe = require("stripe")("sk_test_51PpuIsRrQ90ghplHZ72KVV30xe0nCrmF3cIXAyGE7JbgJE1XnQ88zjn4sPxoOmyHUxNddk25BirPVfCaoMerNDzw00Pyp80VLt");

// /* CREATE BOOKING */
// router.post("/create", async (req, res) => {
//   try {
//     const { customerId, hostId, listingId, startDate, endDate, totalPrice, userDetails, paymentMethodId } = req.body;

//     // Validate incoming data
//     if (!customerId || !hostId || !listingId || !startDate || !endDate || !totalPrice || !userDetails || !paymentMethodId) {
//       return res.status(400).json({ message: "All fields are required!" });
//     }

//     // Create a payment intent with Stripe
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(totalPrice * 100),
//       currency: "inr",
//       payment_method: paymentMethodId,
//       confirm: true,
//     });

//     // Check if payment was successful
//     if (paymentIntent.status !== "succeeded") {
//       return res.status(402).json({ message: "Payment not successful.", status: paymentIntent.status });
//     }

//     // Create a new booking
//     const newBooking = new Booking({
//       customerId,
//       hostId,
//       listingId,
//       startDate,
//       endDate,
//       totalPrice,
//       userDetails,
//       paymentStatus: paymentIntent.status,
//     });

//     await newBooking.save();
//     res.status(200).json(newBooking);
//   } catch (err) {
//     console.error("Booking creation failed:", err.message);

//     if (err.type === "StripeCardError") {
//       return res.status(402).json({ message: "Payment failed. Please check your card details.", error: err.message });
//     } else if (err.code === "card_declined") {
//       return res.status(402).json({ message: "Card was declined. Please use another card." });
//     } else {
//       res.status(500).json({ message: "Failed to create a new booking!", error: err.message });
//     }
//   }
// });

// module.exports = router;













