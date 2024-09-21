

// import { useEffect, useState } from "react";
// import "../styles/List.scss";
// import Loader from "../components/Loader";
// import Navbar from "../components/Navbar";
// import { useDispatch, useSelector } from "react-redux";
// import { setTripList } from "../redux/state";
// import ListingCard from "../components/ListingCard";
// import Footer from "../components/Footer";

// const TripList = () => {
//   const [loading, setLoading] = useState(true);
//   const userId = useSelector((state) => state.user._id);
//   const tripList = useSelector((state) => state.user.tripList);

//   const dispatch = useDispatch();

//   const getTripList = async () => {
//     try {
//       const response = await fetch(`http://localhost:3001/users/${userId}/trips`, {
//         method: "GET",
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch trips");
//       }

//       const data = await response.json();
//       console.log("Trip Data:", data); // Log the data to verify the `type` field
//       dispatch(setTripList(data));
//       setLoading(false);
//     } catch (err) {
//       console.log("Fetch Trip List failed!", err.message);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getTripList();
//   }, []);

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <Navbar />
//       <h1 className="title-list">Your Trip List</h1>
//       <div className="list">
//         {tripList?.map(({ _id, listingId, title, city, province, country, category, type, totalPrice, listingPhotoPaths }) => (
//           <ListingCard
//             key={_id} // Unique key for each trip
//             listingId={listingId}
//             title={title || "No title available"}
//             city={city || "No city available"}
//             province={province || "No province available"}
//             country={country || "No country available"}
//             category={category || "No category available"}
//             type={type || "No type available"} // Ensure this field is mapped correctly
//             price={totalPrice || 0}
//             listingPhotoPaths={listingPhotoPaths || []}
            
//           />
//         ))}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default TripList;





import { useEffect, useState } from "react";
import "../styles/List.scss";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setTripList } from "../redux/state";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const TripList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user._id);
  const tripList = useSelector((state) => state.user.tripList);
  const dispatch = useDispatch();

  const getTripList = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}/trips`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch trips");
      }

      const data = await response.json();
      dispatch(setTripList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Trip List failed!", err.message);
      setLoading(false);
    }
  };

  const cancelBooking = async (tripId) => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}/trips/${tripId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to cancel the booking");
      }

      // Update trip list after cancellation
      dispatch(setTripList(tripList.filter(trip => trip._id !== tripId)));
    } catch (err) {
      console.log("Cancellation failed!", err.message);
    }
  };

  useEffect(() => {
    getTripList();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Trip List</h1>
      <div className="list">
        {tripList?.map(({ _id, listingId, title, city, province, country, category, type, totalPrice, listingPhotoPaths }) => (
          <div key={_id} className="listing-card">
            <ListingCard
              listingId={listingId}
              title={title || "No title available"}
              city={city || "No city available"}
              province={province || "No province available"}
              country={country || "No country available"}
              category={category || "No category available"}
              type={type || "No type available"}
              price={totalPrice || 0}
              listingPhotoPaths={listingPhotoPaths || []}
            />
            <button onClick={() => cancelBooking(_id)} className="cancel-button">Cancel Booking</button>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default TripList;
