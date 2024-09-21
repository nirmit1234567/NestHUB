









//likely working 



const router = require("express").Router();
const Booking = require("../models/Booking");
const User = require("../models/User");
const Listing = require("../models/Listing");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");






// /* GET TRIP LIST */
router.get("/:userId/trips", async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch trips for the specific user, along with relevant listing and host details
    const trips = await Booking.find({ customerId: userId })
      .populate("listingId", "title city province country category type price listingPhotoPaths")
      .populate("hostId", "name");

    if (!trips.length) {
      return res.status(404).json({ message: "No trips found for this user." });
    }

    // Map the trip details to a structured format
    const tripList = trips.map(trip => ({
      _id: trip._id,
      listingId: trip.listingId?._id,
      title: trip.listingId?.title || "No title available",
      city: trip.listingId?.city || "No city available",
      province: trip.listingId?.province || "No province available",
      country: trip.listingId?.country || "No country available",
      category: trip.listingId?.category || "No category available",
      type: trip.listingId?.type || "No type available", // Ensuring type is populated
      totalPrice: trip.totalPrice || 0,
      listingPhotoPaths: trip.listingId?.listingPhotoPaths || [],
      hostId: trip.hostId?._id,
      hostName: trip.hostId?.name || "Unknown host",
    }));

    res.status(200).json(tripList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cannot find trips!", error: err.message });
  }
});










// DELETE trip for a specific user
router.delete("/:userId/trips/:tripId", async (req, res) => {
  try {
    const { userId, tripId } = req.params;

    // Find the trip and delete it
    const deletedTrip = await Booking.findOneAndDelete({ _id: tripId, customerId: userId });

    if (!deletedTrip) {
      return res.status(404).json({ message: "Trip not found or not owned by user." });
    }

    res.status(200).json({ message: "Trip canceled successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to cancel trip.", error: err.message });
  }
});










/* ADD LISTING TO WISHLIST */
router.patch("/:userId/:listingId", async (req, res) => {
  try {
    const { userId, listingId } = req.params;
    const user = await User.findById(userId);
    const listing = await Listing.findById(listingId).populate("creator");

    if (!user || !listing) {
      return res.status(404).json({ message: "User or listing not found!" });
    }

    const favoriteListingIndex = user.wishList.findIndex((item) => item._id.toString() === listingId);

    if (favoriteListingIndex > -1) {
      // Listing is already in wishlist, remove it
      user.wishList.splice(favoriteListingIndex, 1);
      await user.save();
      res.status(200).json({ message: "Listing removed from wishlist", wishList: user.wishList });
    } else {
      // Listing is not in wishlist, add it
      user.wishList.push(listing);
      await user.save();
      res.status(200).json({ message: "Listing added to wishlist", wishList: user.wishList });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message }); // Change to 500 for server errors
  }
});




/* GET PROPERTY LIST */
router.get("/:userId/properties", async (req, res) => {
  try {
    const { userId } = req.params;
    const properties = await Listing.find({ creator: userId }).populate("creator");

    if (!properties.length) {
      return res.status(404).json({ message: "No properties found for this user." });
    }

    res.status(200).json(properties); // Successful response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cannot find properties!", error: err.message }); // Change to 500 for server errors
  }
});

/* DELETE PROPERTY */
router.delete("/:userId/properties/:propertyId", async (req, res) => {
  try {
    const { userId, propertyId } = req.params;
    const result = await Listing.deleteOne({ _id: propertyId, creator: userId });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Property not found or you do not have permission to delete it." });
    }

    res.status(200).json({ message: "Property deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete property.", error: err.message });
  }
});













/* GET RESERVATION LIST */
router.get("/:userId/reservations", async (req, res) => {
  try {
    const { userId } = req.params;

    const reservations = await Booking.find({ hostId: userId })
      .populate("listingId", "city province country category listingPhotoPaths price") // Populate listing details, including price
      .populate("customerId", "name email mobile"); // Populate customer details

    if (!reservations.length) {
      return res.status(404).json({ message: "No reservations found for this host." });
    }

    // Format the response to include userDetails, listing details, and payment status
    const formattedReservations = reservations.map(reservation => ({
      listing: reservation.listingId, // All listing details
      customerDetails: reservation.userDetails, // Extracting userDetails
      startDate: reservation.startDate,
      endDate: reservation.endDate,
      totalPrice: reservation.totalPrice,
      paymentStatus: reservation.paymentMethodId ? true : false, // Assuming paymentMethodId indicates payment
    }));

    res.status(200).json(formattedReservations); // Successful response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cannot find reservations!", error: err.message });
  }
});



















// Fetch user by ID (GET /users/:userId/profile)
router.get("/:userId/profile", async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.isValidObjectId(userId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const user = await User.findById(userId).select("firstName lastName email profileImagePath");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Error fetching user profile", error: err.message });
  }
});

// Update user by ID (PUT /users/:userId/profile)
router.put("/:userId/profile", async (req, res) => {
  const { userId } = req.params;
  const { firstName, lastName, email } = req.body;

  if (!mongoose.isValidObjectId(userId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, email },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Error updating user profile", error: err.message });
  }
});

// Delete user by ID (DELETE /users/:userId/profile)
router.delete("/:userId/profile", async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.isValidObjectId(userId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(204).send(); 
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Error deleting user profile", error: err.message });
  }
});

module.exports = router;
