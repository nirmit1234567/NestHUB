import { useEffect, useState } from "react";
import "../styles/ListingDetails.scss";
import { useParams } from "react-router-dom";

const ListingDetails = () => {
    const [loading, setLoading] = useState(true);
    const { listingId } = useParams();
    const [listing, setListing] = useState(null);

    const getListingDetails = async () => {
        try {
            const response = await fetch(`http://localhost:3001/properties/${listingId}`, {
                method: "GET",
            });

            const data = await response.json();
            setListing(data);
        } catch (err) {
            console.log("Fetch Listing Details Failed", err.message);
        } 
    };

    useEffect(() => {
        getListingDetails();
    }, []);

    return (
        <div className="listing-details">
            <div className="title">
                <h1>{listing.title}</h1>
                <div></div>
            </div>
            <div className="photos">
                {listing.listingPhotoPaths?.map((item) => (
                    <img src={`http:localhost:3001/${item.replace("public", "")}`} alt="listing photo" />
                ))}
            </div>

            <h2>{listing.type} in {listing.city}, {listing.province}, {listing.country}</h2>
            <p>{listing.guestcount} guests </p>
        </div>
    );
};

export default ListingDetails;
