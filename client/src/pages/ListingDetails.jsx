// import { useEffect, useState } from "react";
// import "../styles/ListingDetails.scss";
// import { useNavigate, useParams } from "react-router-dom";
// import { facilities } from "../data";

// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";
// import { DateRange } from "react-date-range";
// import Loader from "../components/Loader";
// import Navbar from "../components/Navbar";
// import { useSelector } from "react-redux";
// import Footer from "../components/Footer"

// const ListingDetails = () => {
//   const [loading, setLoading] = useState(true);

//   const { listingId } = useParams();
//   const [listing, setListing] = useState(null);

//   const getListingDetails = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3001/properties/${listingId}`,
//         {
//           method: "GET",
//         }
//       );

//       const data = await response.json();
//       setListing(data);
//       setLoading(false);
//     } catch (err) {
//       console.log("Fetch Listing Details Failed", err.message);
//     }
//   };

//   useEffect(() => {
//     getListingDetails();
//   }, []);

//   console.log(listing)

//   /* BOOKING CALENDAR */
//   const [dateRange, setDateRange] = useState([
//     {
//       startDate: new Date(),
//       endDate: new Date(),
//       key: "selection",
//     },
//   ]);

//   const handleSelect = (ranges) => {
//     // Update the selected date range when user makes a selection
//     setDateRange([ranges.selection]);
//   };

//   const start = new Date(dateRange[0].startDate);
//   const end = new Date(dateRange[0].endDate);
//   const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24); // Calculate the difference in day unit

//   /* SUBMIT BOOKING */
//   const customerId = useSelector((state) => state?.user?._id)

//   const navigate = useNavigate()

//   const handleSubmit = async () => {
//     try {
//       const bookingForm = {
//         customerId,
//         listingId,
//         hostId: listing.creator._id,
//         startDate: dateRange[0].startDate.toDateString(),
//         endDate: dateRange[0].endDate.toDateString(),
//         totalPrice: listing.price * dayCount,
//       }

//       const response = await fetch("http://localhost:3001/bookings/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(bookingForm)
//       })

//       if (response.ok) {
//         navigate(`/${customerId}/trips`)
//       }
//     } catch (err) {
//       console.log("Submit Booking Failed.", err.message)
//     }
//   }

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <Navbar />

//       <div className="listing-details">
//         <div className="title">
//           <h1>{listing.title}</h1>
//           <div></div>
//         </div>

//         <div className="photos">
//           {listing.listingPhotoPaths?.map((item) => (
//             <img
//               src={`http://localhost:3001/${item.replace("public", "")}`}
//               alt="listing photo"
//             />
//           ))}
//         </div>

//         <h2>
//           {listing.type} in {listing.city}, {listing.province},{" "}
//           {listing.country}
//         </h2>
//         <p>
//           {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) -{" "}
//           {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)
//         </p>
//         <hr />

//         <div className="profile">
//           <img
//             src={`http://localhost:3001/${listing.creator.profileImagePath.replace(
//               "public",
//               ""
//             )}`}
//           />
//           <h3>
//             Hosted by {listing.creator.firstName} {listing.creator.lastName}
//           </h3>
//         </div>
//         <hr />

//         <h3>Description</h3>
//         <p>{listing.description}</p>
//         <hr />

//         <h3>{listing.highlight}</h3>
//         <p>{listing.highlightDesc}</p>
//         <hr />

//         <div className="booking">
//           <div>
//             <h2>What this place offers?</h2>
//             <div className="amenities">
//               {listing.amenities[0].split(",").map((item, index) => (
//                 <div className="facility" key={index}>
//                   <div className="facility_icon">
//                     {
//                       facilities.find((facility) => facility.name === item)
//                         ?.icon
//                     }
//                   </div>
//                   <p>{item}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div>
//             <h2>How long do you want to stay?</h2>
//             <div className="date-range-calendar">
//               <DateRange ranges={dateRange} onChange={handleSelect} />
//               {dayCount > 1 ? (
//                 <h2>
//                   ₹{listing.price} x {dayCount} nights
//                 </h2>
//               ) : (
//                 <h2>
//                   ₹{listing.price} x {dayCount} night
//                 </h2>
//               )}

//               <h2>Total price: ₹{listing.price * dayCount}</h2>
//               <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
//               <p>End Date: {dateRange[0].endDate.toDateString()}</p>

//               <button className="button" type="submit" onClick={handleSubmit}>
//                 BOOKING
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default ListingDetails;
















// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { facilities } from "../data";
// import "../styles/ListingDetails.scss";
// import "react-date-range/dist/theme/default.css";
// import { DateRange } from "react-date-range";
// import "react-date-range/dist/styles.css";

// import Loader from "../components/Loader";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { useSelector } from "react-redux";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   CardElement,
//   useStripe,
//   useElements,
//   Elements,
// } from "@stripe/react-stripe-js";

// const stripePromise = loadStripe("your-publishable-key");

// const ListingDetails = () => {
//   const [loading, setLoading] = useState(true);
//   const [listing, setListing] = useState(null);
//   const [dateRange, setDateRange] = useState([{ startDate: new Date(), endDate: new Date(), key: "selection" }]);
//   const [showForm, setShowForm] = useState(false);
//   const [userDetails, setUserDetails] = useState({ name: "", mobile: "", email: "" });

//   const { listingId } = useParams();
//   const customerId = useSelector((state) => state?.user?._id);
//   const navigate = useNavigate();
//   const stripe = useStripe();
//   const elements = useElements();

//   const getListingDetails = async () => {
//     try {
//       const response = await fetch(`http://localhost:3001/properties/${listingId}`);
//       const data = await response.json();
//       setListing(data);
//       setLoading(false);
//     } catch (err) {
//       console.error("Fetch Listing Details Failed:", err.message);
//     }
//   };

//   useEffect(() => {
//     getListingDetails();
//   }, [listingId]);

//   const handleSelect = (ranges) => {
//     setDateRange([ranges.selection]);
//   };

//   const start = new Date(dateRange[0].startDate);
//   const end = new Date(dateRange[0].endDate);
//   const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       console.error("Stripe.js has not loaded yet.");
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);
//     if (!cardElement) {
//       console.error("CardElement not found.");
//       return;
//     }

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card: cardElement,
//     });

//     if (error) {
//       console.error("Error creating payment method:", error);
//       alert(error.message);
//       return;
//     }

//     const bookingForm = {
//       customerId,
//       listingId,
//       hostId: listing.creator._id,
//       startDate: dateRange[0].startDate,
//       endDate: dateRange[0].endDate,
//       totalPrice: listing.price * dayCount,
//       userDetails,
//       paymentMethodId: paymentMethod.id,
//     };

//     try {
//       const response = await fetch("http://localhost:3001/bookings/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(bookingForm),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to create booking");
//       }

//       const responseData = await response.json();
//       alert("Booking successful!");
//       navigate(`/${customerId}/trips`);
//     } catch (err) {
//       console.error("Submit Booking Failed:", err.message);
//       alert("There was an issue with your booking. Please try again.");
//     }
//   };

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <Navbar />
//       <div className="listing-details">
//         <div className="title">
//           <h1>{listing.title}</h1>
//         </div>

//         <div className="photos">
//           {listing.listingPhotoPaths?.map((item, index) => (
//             <img
//               key={index}
//               src={`http://localhost:3001/${item.replace("public", "")}`}
//               alt="listing photo"
//             />
//           ))}
//         </div>

//         <h2>
//           {listing.type} in {listing.city}, {listing.province}, {listing.country}
//         </h2>
//         <p>
//           {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) - {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)
//         </p>
//         <hr />

//         <div className="profile">
//           <img
//             src={`http://localhost:3001/${listing.creator.profileImagePath.replace("public", "")}`}
//             alt="Host Profile"
//           />
//           <h3>
//             Hosted by {listing.creator.firstName} {listing.creator.lastName}
//           </h3>
//         </div>
//         <hr />

//         <h3>Description</h3>
//         <p>{listing.description}</p>
//         <hr />

//         <h3>{listing.highlight}</h3>
//         <p>{listing.highlightDesc}</p>
//         <hr />

//         <div className="booking">
//           <div>
//             <h2>What this place offers?</h2>
//             <div className="amenities">
//               {listing.amenities[0].split(",").map((item, index) => (
//                 <div className="facility" key={index}>
//                   <div className="facility_icon">
//                     {facilities.find((facility) => facility.name === item)?.icon}
//                   </div>
//                   <p>{item}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div>
//             <h2>How long do you want to stay?</h2>
//             <div className="date-range-calendar">
//               <DateRange ranges={dateRange} onChange={handleSelect} />
//               <h2>
//                 ₹{listing.price} x {dayCount} {dayCount > 1 ? "nights" : "night"}
//               </h2>
//               <h2>Total price: ₹{listing.price * dayCount}</h2>
//               <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
//               <p>End Date: {dateRange[0].endDate.toDateString()}</p>

//               <button className="button" onClick={() => setShowForm(true)}>
//                 Confirm Booking
//               </button>
//             </div>
//           </div>

//           {showForm && (
//             <form onSubmit={handleSubmit}>
//               <h2>Enter your details to confirm your booking</h2>
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={userDetails.name}
//                 onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Mobile"
//                 value={userDetails.mobile}
//                 onChange={(e) => setUserDetails({ ...userDetails, mobile: e.target.value })}
//                 required
//               />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={userDetails.email}
//                 onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
//                 required
//               />
//               <CardElement />
//               <button type="submit" disabled={!stripe}>Confirm and Pay</button>
//             </form>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ListingDetails;











import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { facilities } from "../data";
import "../styles/ListingDetails.scss";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";

import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("your-publishable-key");

const ListingDetails = () => {
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(null);
  const [dateRange, setDateRange] = useState([{ startDate: new Date(), endDate: new Date(), key: "selection" }]);
  const [showForm, setShowForm] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: "", mobile: "", email: "" });

  const { listingId } = useParams();
  const customerId = useSelector((state) => state?.user?._id);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const getListingDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3001/properties/${listingId}`);
      const data = await response.json();
      setListing(data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch Listing Details Failed:", err.message);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, [listingId]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe.js has not loaded yet.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      console.error("CardElement not found.");
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error("Error creating payment method:", error);
      alert(error.message);
      return;
    }

    const bookingForm = {
      customerId,
      listingId,
      hostId: listing.creator._id,
      startDate: dateRange[0].startDate,
      endDate: dateRange[0].endDate,
      totalPrice: listing.price * dayCount,
      userDetails,
      paymentMethodId: paymentMethod.id,
    };

    try {
      const response = await fetch("http://localhost:3001/bookings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingForm),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create booking");
      }

      const responseData = await response.json();
      alert("Booking successful!");
      navigate(`/${customerId}/trips`);
    } catch (err) {
      console.error("Submit Booking Failed:", err.message);
      alert("There was an issue with your booking. Please try again.");
    }
  };

  const handleCancel = () => {
    setUserDetails({ name: "", mobile: "", email: "" });
    setShowForm(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div className="listing-details">
        <div className="title">
          <h1>{listing.title}</h1>
        </div>

        <div className="photos">
          {listing.listingPhotoPaths?.map((item, index) => (
            <img
              key={index}
              src={`http://localhost:3001/${item.replace("public", "")}`}
              alt="listing photo"
            />
          ))}
        </div>

        <h2>
          {listing.type} in {listing.city}, {listing.province}, {listing.country}
        </h2>
        <p>
          {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) - {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)
        </p>
        <hr />

        <div className="profile">
          <img
            src={`http://localhost:3001/${listing.creator.profileImagePath.replace("public", "")}`}
            alt="Host Profile"
          />
          <h3>
            Hosted by {listing.creator.firstName} {listing.creator.lastName}
          </h3>
        </div>
        <hr />

        <h3>Description</h3>
        <p>{listing.description}</p>
        <hr />

        <h3>{listing.highlight}</h3>
        <p>{listing.highlightDesc}</p>
        <hr />

        <div className="booking">
          <div>
            <h2>What this place offers?</h2>
            <div className="amenities">
              {listing.amenities[0].split(",").map((item, index) => (
                <div className="facility" key={index}>
                  <div className="facility_icon">
                    {facilities.find((facility) => facility.name === item)?.icon}
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2>How long do you want to stay?</h2>
            <div className="date-range-calendar">
              <DateRange ranges={dateRange} onChange={handleSelect} />
              <h2>
                ₹{listing.price} x {dayCount} {dayCount > 1 ? "nights" : "night"}
              </h2>
              <h2>Total price: ₹{listing.price * dayCount}</h2>
              <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
              <p>End Date: {dateRange[0].endDate.toDateString()}</p>

              <button className="button" onClick={() => setShowForm(true)}>
                Confirm Booking
              </button>
            </div>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
              <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Enter your details to confirm your booking</h2>

              <input
                type="text"
                placeholder="Name"
                value={userDetails.name}
                onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                required
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />

              <input
                type="text"
                placeholder="Mobile"
                value={userDetails.mobile}
                onChange={(e) => setUserDetails({ ...userDetails, mobile: e.target.value })}
                required
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />

              <input
                type="email"
                placeholder="Email"
                value={userDetails.email}
                onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                required
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />

              <div style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
                <CardElement />
              </div>

              <button
                type="submit"
                disabled={!stripe}
                style={{ padding: '10px', borderRadius: '4px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', cursor: 'pointer' }}
              >
                Confirm and Pay
              </button>

              <button
                type="button"
                onClick={handleCancel}
                style={{ padding: '10px', borderRadius: '4px', backgroundColor: '#f44336', color: '#fff', border: 'none', cursor: 'pointer', marginTop: '10px' }}
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ListingDetails;

