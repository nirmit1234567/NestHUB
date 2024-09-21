// const mongoose = require("mongoose");

// const BookingSchema = new mongoose.Schema(
//   {
//     customerId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     hostId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     listingId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Listing",
//     },
//     startDate: {
//       type: String,
//       required: true,
//     },
//     endDate: {
//       type: String,
//       required: true,
//     },
//     totalPrice: {
//       type: Number,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// const Booking = mongoose.model("Booking", BookingSchema)
// module.exports = Booking


























// // models/Booking.js
// const mongoose = require("mongoose");

// const BookingSchema = new mongoose.Schema(
//   {
//     customerId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     hostId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     listingId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Listing",
//       required: true,
//     },
//     startDate: {
//       type: String,
//       required: true,
//     },
//     endDate: {
//       type: String,
//       required: true,
//     },
//     totalPrice: {
//       type: Number,
//       required: true,
//     },
//     userDetails: {
//       name: {
//         type: String,
//         required: true,
//       },
//       mobile: {
//         type: String,
//         required: true,
//       },
//       email: {
//         type: String,
//         required: true,
//       },
//     },
//     paymentStatus: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// const Booking = mongoose.model("Booking", BookingSchema);
// module.exports = Booking;



const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    customerId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    listingId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Listing", 
      required: true 
    },
    hostId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    startDate: { 
      type: Date, 
      required: true 
    },
    endDate: { 
      type: Date, 
      required: true 
    },
    totalPrice: { 
      type: Number, 
      required: true 
    },
    userDetails: {
      name: { 
        type: String, 
        required: true 
      },
      mobile: { 
        type: String, 
        required: true 
      },
      email: { 
        type: String, 
        required: true 
      },
    },
    paymentMethodId: { 
      type: String, 
      required: true 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
