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
//       <div className="list">
        
//         {reservationList?.map(({ listingId, hostId, startDate, endDate, totalPrice, booking=true }) => (
//           <ListingCard
//             listingId={listingId._id}
//             creator={hostId._id}
//             listingPhotoPaths={listingId.listingPhotoPaths}
//             city={listingId.city}
//             province={listingId.province}
//             country={listingId.country}
//             category={listingId.category}
//             startDate={startDate}
//             endDate={endDate}
//             totalPrice={totalPrice}
//             booking={booking}
//           />
//         ))}
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
//           reservationList.map(({ listingId, hostId, customerId, startDate, endDate, totalPrice }) => (
//             <div key={listingId._id} className="reservation-card">
//               <ListingCard
//                 listingId={listingId._id}
//                 creator={hostId._id}
//                 listingPhotoPaths={listingId.listingPhotoPaths}
//                 city={listingId.city}
//                 province={listingId.province}
//                 country={listingId.country}
//                 category={listingId.category}
//                 startDate={startDate}
//                 endDate={endDate}
//                 totalPrice={totalPrice}
//                 booking={true}
//               />
//               <div className="customer-details">
//                 <h3>Reserved By:</h3>
//                 <p>Name: {customerId.name}</p>
//                 <p>Email: {customerId.email}</p>
//                 <p>Phone: {customerId.mobile}</p>
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







import { useEffect, useState } from "react";
import "../styles/List.scss";
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
      dispatch(setReservationList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Reservation List failed!", err.message);
    }
  };

  useEffect(() => {
    getReservationList();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Reservation List</h1>
      <div className="list">
        {reservationList?.length > 0 ? (
          reservationList.map(({ listing, customerDetails, startDate, endDate, totalPrice, paymentStatus }) => (
            <div key={listing._id} className="reservation-card">
              <ListingCard
                listingId={listing._id}
                creator={listing.hostId} // Adjust this as needed
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
              <div className="customer-details">
                <h3>Reserved By:</h3>
                <p>Name: {customerDetails.name}</p>
                <p>Email: {customerDetails.email}</p>
                <p>Phone: {customerDetails.mobile}</p>
                <p>Payment: {paymentStatus ? "Paid" : "Pending"}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No reservations found.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ReservationList;
