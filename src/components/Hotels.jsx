import React from "react";
import "./Dashboard.css";

function Hotels() {

  const hotels = [
    {
      id: 1,
      name: "Hotel Dwarika",
      location: "Kathmandu",
      price: "Rs. 5,500 / night",
      rating: "★★★★★",
      image: "/hotel1.jpg",
    },
    {
      id: 2,
      name: "Green Park Resort",
      location: "Chitwan",
      price: "Rs. 3,000 / night",
      rating: "★★★★☆",
      image: "/hotel2.jpg",
    },
    {
      id: 3,
      name: "Mystic Mountain Lodge",
      location: "Mustang",
      price: "Rs. 6,500 / night",
      rating: "★★★★★",
      image: "/hotel3.jpg",
    },
    {
      id: 4,
      name: "Fulbari hotel",
      location: "Pokhara",
      price: "Rs. 8000 / night",
      rating: "★★★★☆",
      image: "/fulbari.jpg",
    },
  ];

  return (
    <div className="page">

      <h1>Recommended Hotels</h1><br></br>

      <div className="hotel-grid">

        {hotels.map((hotel) => (

          <div className="hotel-card" key={hotel.id}>

            <img
              src={hotel.image}
              alt={hotel.name}
            />

            <div className="hotel-info">
              

              <h2>{hotel.name}</h2>

              <p> {hotel.location}</p>

            <span className="rating">
            {hotel.rating}
            </span>

             <h3>{hotel.price}</h3>

    <div className="features">
        <span>Free WiFi</span>
        <span> Breakfast</span>
        <span> Parking</span>
    </div>

   

</div>

              

            </div>

         

        ))}

      </div>

    </div>
  );
}

export default Hotels;