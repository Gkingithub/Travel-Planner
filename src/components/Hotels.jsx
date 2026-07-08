import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { getHotelRecommendations } from "../service/hotelService";

function Hotels() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await getHotelRecommendations();

      if (response.success) {
        setHotels(response.data);
      }
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  return (
    <div className="page">
      <h1>Recommended Hotels</h1>
      <br />

      <div className="hotel-grid">
        {hotels.map((hotel, index) => (
          <div className="hotel-card" key={index}>
            <img
              src={
                hotel.imageUrl
                  ? `http://localhost:5055/${hotel.imageUrl}`
                  : "/hotel-placeholder.jpg"
              }
              alt={hotel.hotelName}
            />

            <div className="hotel-info">
              <h2>{hotel.hotelName}</h2>

              <p>{hotel.category}</p>

              <span className="rating">
                {"★".repeat(Number(hotel.rating))}
              </span>

              <h3>Rs. {hotel.pricePerNight} / night</h3>

              <div className="features">
                {hotel.facilities
                  ? hotel.facilities.split(",").map((facility, i) => (
                      <span key={i}>{facility.trim()}</span>
                    ))
                  : <span>No facilities listed</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hotels;