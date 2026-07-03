import React from "react";
import "./Dashboard.css";

function Destinations() {

  const destinations = [
    {
      id: 1,
      name: "Pokhara",
      image: "/pokhara.jpg",
      description: "Lakes, mountains and adventure.",
      budget: "Rs. 12,000",
    },
    {
      id: 2,
      name: "Chitwan",
      image: "/chitwan.jpg",
      description: "Wildlife and jungle safari.",
      budget: "Rs. 15,000",
    },
    {
      id: 3,
      name: "Mustang",
      image: "/mustang.jpg",
      description: "Beautiful Himalayan landscapes.",
      budget: "Rs. 25,000",
    },
    {
      id: 4,
      name: "Lumbini",
      image: "/lumbini.jpg",
      description: "Birthplace of Lord Buddha.",
      budget: "Rs. 10,000",
    },
    {
      id: 5,
      name: "Rara",
      image: "/Rara.jpg",
      description: "Crystal clear lake and peaceful nature.",
      budget: "Rs. 28,000",
    },
    {
      id: 6,
      name: "Ilam",
      image: "/Ilam.jpg",
      description: "Beautiful tea gardens.",
      budget: "Rs. 14,000",
    },

    {
      id:7,
      name: "Kathmandu",
      image: "boudha.jpg",
      descriptionn: "Peace and spiritual.",
      budget: "Rs. 3000",
      
    },

    {
      id:8,
      name: "Lalitpur",
      image: "patan.webp",
      description: "Art and Cultural heritage.",
    }

  ];

  return (
    <div className="page">

      <h1>Popular Destinations</h1>

      <div className="destination-grid">

        {destinations.map((place) => (

          <div className="destination-card" key={place.id}>

            <img
              src={place.image}
              alt={place.name}
            />

            <div className="destination-info">

              <h2>{place.name}</h2>

              <p>{place.description}</p>

              <h3>{place.budget}</h3>

              <button>
                View Details
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Destinations;