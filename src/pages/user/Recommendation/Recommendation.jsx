import React, { useState } from "react";
import "./Recommendation.css";
import { getRecommendations } from "../../../service/RecommendationService";

import { FaMountain } from "react-icons/fa";
import { GiForestCamp, GiHiking } from "react-icons/gi";
import { MdTempleBuddhist } from "react-icons/md";
import { PiTreeEvergreenFill } from "react-icons/pi";
import { FaMasksTheater } from "react-icons/fa6";
import { MdOutlineVilla } from "react-icons/md";

function Recommendation() {

  const [preferences, setPreferences] = useState({
    adventure: false,
    nature: false,
    wildlife: false,
    religious: false,
    cultural: false,
    luxury: false,
    trekking: false,
  });

  const [recommendations, setRecommendations] = useState([]);

  const interests = [
  {
    key: "adventure",
    label: "Adventure",
    icon: <FaMountain />,
  },
  {
    key: "nature",
    label: "Nature",
    icon: <PiTreeEvergreenFill />,
  },
  {
    key: "wildlife",
    label: "Wildlife",
    icon: <GiForestCamp />,
  },
  {
    key: "religious",
    label: "Religious",
    icon: <MdTempleBuddhist />,
  },
  {
    key: "cultural",
    label: "Cultural",
    icon: <FaMasksTheater />,
  },
  {
    key: "luxury",
    label: "Luxury",
    icon: <MdOutlineVilla />,
  },
  {
    key: "trekking",
    label: "Trekking",
    icon: <GiHiking />,
  },
];
  const toggleInterest = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleRecommend = async () => {
    try {
      const request = {
        adventure: preferences.adventure ? 1 : 0,
        nature: preferences.nature ? 1 : 0,
        wildlife: preferences.wildlife ? 1 : 0,
        religious: preferences.religious ? 1 : 0,
        culture: preferences.cultural ? 1 : 0,
        luxury: preferences.luxury ? 1 : 0,
        trekking: preferences.trekking ? 1 : 0,
      };

      const response = await getRecommendations(request);

      if (response.success) {
        setRecommendations(response.data);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to get recommendations.");
    }
  };

  return (
    <div className="recommend-page">

      <div className="hero">

        <h1> Discover Your Next Destination</h1>

        <p>
          Select your travel interests and let YATRIQ
          recommend the perfect destination for you.
        </p>

      </div><br></br>
      <br></br>

      <div className="recommend-box">

        <h2>Select Your Interests</h2>

        <div className="interest-grid">

          {interests.map((item) => (

            <div
              key={item.key}
              className={`interest-card ${
                preferences[item.key] ? "selected" : ""
              }`}
              onClick={() => toggleInterest(item.key)}
            >

              <div className="interest-icon">
                {item.icon}
              </div>

              <span>{item.label}</span>

            </div>

          ))}

        </div>

        <button
          className="recommend-btn"
          onClick={handleRecommend}
        >
          🔍 Find Destinations
        </button>

      </div>

      {recommendations.length > 0 && (

        <div className="recommend-results">

          <h2>Recommended Destinations</h2>

          <div className="recommend-grid"></div>
          {recommendations.map((item) => (

  <div
    className="recommend-card"
    key={item.destinationId}
  >

    <div className="card-image">

      <img
        src={
          item.imageUrl ||
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600"
        }
        alt={item.destinationName}
      />

      <div className="match-badge">
        {(item.similarity * 100).toFixed(0)}% Match
      </div>

    </div>

    <div className="card-content">

      <h3>{item.destinationName}</h3>

      <p>
        {item.description ||
          "A beautiful travel destination perfect for your selected interests."}
      </p>

      <div className="progress-title">

        <span>Similarity Score</span>

        <span>
          {(item.similarity * 100).toFixed(1)}%
        </span>

      </div>

      <div className="progress">

        <div
          className="progress-fill"
          style={{
            width: `${item.similarity * 100}%`,
          }}
        ></div>

      </div>

      <button className="details-btn">
        Explore Destination
      </button>

    </div>

  </div>

))}

          

        </div>

      )}

    </div>
  );
}


export default Recommendation;