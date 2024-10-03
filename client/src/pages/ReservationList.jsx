

// import { useEffect, useState } from "react";
// import "../styles/List.scss";
// import Loader from "../components/Loader";
// import Navbar from "../components/Navbar";
// import { useDispatch, useSelector } from "react-redux";
// import { setReservationList } from "../redux/state";
// import ListingCard from "../components/ListingCard";
// import Footer from "../components/Footer";

// const ReservationList = () => {
//   const [loading, setLoading] = useState(true);
//   const userId = useSelector((state) => state.user._id);
//   const reservationList = useSelector((state) => state.user.reservationList);

//   const dispatch = useDispatch();

//   const getReservationList = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3001/users/${userId}/reservations`,
//         {
//           method: "GET",
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch reservations");
//       }

//       const data = await response.json();
//       dispatch(setReservationList(data));
//       setLoading(false);
//     } catch (err) {
//       console.log("Fetch Reservation List failed!", err.message);
//     }
//   };

//   useEffect(() => {
//     getReservationList();
//   }, []);

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <Navbar />
//       <h1 className="title-list">Your Reservation List</h1>
//       <div className="list">
//         {reservationList?.length > 0 ? (
//           reservationList.map(({ listing, customerDetails, startDate, endDate, totalPrice, paymentStatus }) => (
//             <div key={listing._id} className="reservation-card">
//               <ListingCard
//                 listingId={listing._id}
//                 creator={listing.hostId} // Adjust this as needed
//                 listingPhotoPaths={listing.listingPhotoPaths}
//                 city={listing.city}
//                 province={listing.province}
//                 country={listing.country}
//                 category={listing.category}
//                 startDate={startDate}
//                 endDate={endDate} 
//                 totalPrice={totalPrice}
//                 booking={true}
//               />
//               <div className="customer-details">
//                 <h3>Reserved By:</h3>
//                 <p>Name: {customerDetails.name}</p>
//                 <p>Email: {customerDetails.email}</p>
//                 <p>Phone: {customerDetails.mobile}</p>
//                 <p>Payment: {paymentStatus ? "Paid" : "Pending"}</p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No reservations found.</p>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ReservationList;



// import { useEffect, useState } from "react";
// import "../styles/List.scss";
// import Loader from "../components/Loader";
// import Navbar from "../components/Navbar";
// import { useDispatch, useSelector } from "react-redux";
// import { setReservationList } from "../redux/state";
// import ListingCard from "../components/ListingCard";
// import Footer from "../components/Footer";

// const ReservationList = () => {
//   const [loading, setLoading] = useState(true);
//   const userId = useSelector((state) => state.user._id);
//   const reservationList = useSelector((state) => state.user.reservationList);
//   const [selectedDetails, setSelectedDetails] = useState(null);

//   const dispatch = useDispatch();

//   const getReservationList = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3001/users/${userId}/reservations`,
//         {
//           method: "GET",
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch reservations");
//       }

//       const data = await response.json();
//       console.log(data); // Check response data to verify customer details
//       dispatch(setReservationList(data));
//       setLoading(false);
//     } catch (err) {
//       console.log("Fetch Reservation List failed!", err.message);
//     }
//   };

//   useEffect(() => {
//     getReservationList();
//   }, []);

//   const handleDetailsClick = (customerDetails, paymentStatus) => {
//     setSelectedDetails({ ...customerDetails, paymentStatus }); // Pass paymentStatus along with customer details
//   };

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <Navbar />
//       <h1 className="title-list">Your Reservation List</h1>
//       <div className="list">
//         {reservationList?.length > 0 ? (
//           reservationList.map(({ listing, customerDetails, startDate, endDate, totalPrice, paymentStatus }) => (
//             <div
//               key={listing._id}
//               className="reservation-card"
//               style={{
//                 margin: "10px",
//                 padding: "15px",
//                 border: "1px solid #ccc",
//                 borderRadius: "8px",
//               }}
//             >
//               <ListingCard
//                 listingId={listing._id}
//                 creator={listing.hostId}
//                 listingPhotoPaths={listing.listingPhotoPaths}
//                 city={listing.city}
//                 province={listing.province}
//                 country={listing.country}
//                 category={listing.category}
//                 startDate={startDate}
//                 endDate={endDate}
//                 totalPrice={totalPrice}
//                 booking={true}
//               />
//               <div
//                 className="customer-details"
//                 style={{
//                   marginTop: "15px",
//                   padding: "10px",
//                   border: "1px solid #007bff",
//                   borderRadius: "5px",
//                   backgroundColor: "#f8f9fa",
//                 }}
//               >
//                 <h3 style={{ color: "#007bff" }}>Reserved By:</h3>
//                 <button
//                   onClick={() =>
//                     handleDetailsClick(customerDetails, paymentStatus) // Pass payment status to handleDetailsClick
//                   }
//                   style={{
//                     marginTop: "10px",
//                     padding: "8px 12px",
//                     border: "none",
//                     borderRadius: "4px",
//                     backgroundColor: "#007bff",
//                     color: "white",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Show Details
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No reservations found.</p>
//         )}
//       </div>
//       {selectedDetails && (
//         <div
//           style={{
//             position: "fixed",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             padding: "20px",
//             border: "1px solid #000",
//             borderRadius: "8px",
//             backgroundColor: "#fff",
//             zIndex: "1000",
//           }}
//         >
//           <h3>Customer Details</h3>
//           <p>Name: {selectedDetails.name}</p>
//           <p>Email: {selectedDetails.email}</p>
//           <p>Phone: {selectedDetails.mobile}</p>
//           <p>
//             Payment Status:{" "}
//             {selectedDetails.paymentStatus ? "Paid" : "Pending"} 
//           </p>
//           <button
//             onClick={() => setSelectedDetails(null)}
//             style={{
//               marginTop: "20px",
//               padding: "8px 12px",
//               border: "none",
//               borderRadius: "4px",
//               backgroundColor: "red",
//               color: "white",
//               cursor: "pointer",
//             }}
//           >
//             Close
//           </button>
//         </div>
//       )}
//       <Footer />
//     </>
//   );
// };

// export default ReservationList;











import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setReservationList } from "../redux/state";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const ReservationList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user._id);
  const reservationList = useSelector((state) => state.user.reservationList);
  const [selectedDetails, setSelectedDetails] = useState(null);

  const dispatch = useDispatch();

  const getReservationList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${userId}/reservations`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch reservations");
      }

      const data = await response.json();
      console.log(data); // Check response data to verify customer details
      dispatch(setReservationList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Reservation List failed!", err.message);
    }
  };

  useEffect(() => {
    getReservationList();
  }, []);

  const handleDetailsClick = (customerDetails, paymentStatus) => {
    setSelectedDetails({ ...customerDetails, paymentStatus }); // Pass paymentStatus along with customer details
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Reservation List</h1>

      {/* Apply blur effect to the background if modal is open */}
      <div
        className="list"
        style={{
          filter: selectedDetails ? "blur(5px)" : "none", // Apply blur if modal is open
          transition: "filter 0.3s ease", // Smooth transition for the blur effect
        }}
      >
        {reservationList?.length > 0 ? (
          reservationList.map(({ listing, customerDetails, startDate, endDate, totalPrice, paymentStatus }) => (
            <div
              key={listing._id}
              className="reservation-card"
              style={{
                margin: "10px",
                padding: "15px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            >
              <ListingCard
                listingId={listing._id}
                creator={listing.hostId}
                listingPhotoPaths={listing.listingPhotoPaths}
                city={listing.city}
                province={listing.province}
                country={listing.country}
                category={listing.category}
                startDate={startDate}
                endDate={endDate}
                totalPrice={totalPrice}
                booking={true}
              />
              <div
                className="customer-details"
                style={{
                  marginTop: "15px",
                  padding: "10px",
                  border: "1px solid #007bff",
                  borderRadius: "5px",
                  backgroundColor: "#f8f9fa",
                }}
              >
                <h3 style={{ color: "#007bff" }}>Reserved By:</h3>
                <button
                  onClick={() =>
                    handleDetailsClick(customerDetails, paymentStatus) // Pass payment status to handleDetailsClick
                  }
                  style={{
                    marginTop: "10px",
                    padding: "8px 12px",
                    border: "none",
                    borderRadius: "4px",
                    backgroundColor: "#007bff",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Show Details : 
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No reservations found.</p>
        )}
      </div>

      {/* Show the customer details in a modal */}
      {selectedDetails && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            border: "1px solid #000",
            borderRadius: "8px",
            backgroundColor: "#fff",
            zIndex: "1000",
            width: "400px",
            textAlign: "center",
          }}
        >
          <h3>Customer Details</h3>
          <p>Name: {selectedDetails.name}</p>
          <p>Email: {selectedDetails.email}</p>
          <p>Phone: {selectedDetails.mobile}</p>
          <p>
            Payment Status: {selectedDetails.paymentStatus ? "Paid" : "Pending"}
          </p>
          <button
            onClick={() => setSelectedDetails(null)}
            style={{
              marginTop: "20px",
              padding: "8px 12px",
              border: "none",
              borderRadius: "4px",
              backgroundColor: "red",
              color: "white",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}
      <Footer />
    </>
  );
};

export default ReservationList;
