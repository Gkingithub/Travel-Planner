import React, { useState } from "react";
import "./Recommendation.css";
import { getRecommendations } from "../../../service/RecommendationService";
import { getDestinationActivities } from "../../../service/userDestinationService";
import Swal from "sweetalert2";
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

  // Popup states
  const [showModal, setShowModal] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);

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
  const hasSelected = Object.values(preferences).some(value => value);

  if (!hasSelected) {
    Swal.fire({
      icon: "warning",
      title: "No Interest Selected",
      text: "Please select at least one travel interest before exploring destinations.",
      confirmButtonText: "OK"
    });

    return;
  }

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
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.message
      });
    }
  } catch (error) {
    console.error(error);

    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to get recommendations."
    });
  }
};

  // Load destination details and activities
  const handleViewDetails = async (id) => {
    try {
      const response = await getDestinationActivities(id);

      if (response.success) {
        setSelectedDestination(response.data);
        setShowModal(true);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
      alert("Unable to load destination details.");
    }
  };

  return (
    <div className="recommend-page">
      <div className="heros">
        <h1>Discover Your Next Destination</h1>

        <p>
          Select your travel interests and let YATRIQ recommend the perfect
          destination for you.
        </p>
      </div>

      <br />
      <br />

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
              <div className="interest-icon">{item.icon}</div>

              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <button
          className="recommend-btn"
          onClick={handleRecommend}
        >
          Explore Destination
        </button>
      </div>
            {recommendations.length > 0 && (
        <div className="recommend-results">
          <h2>Recommended Destinations</h2>

          <div className="recommend-grid">
            {recommendations.map((item) => (
              <div
                className="recommend-card"
                key={item.destinationId}
              >
                <div className="card-image">
                  <img
                    src={`http://localhost:5055${item.imageUrl}`}
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
                    <span>{(item.similarity * 100).toFixed(1)}%</span>
                  </div>

                  <div className="progress">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${item.similarity * 100}%`,
                      }}
                    ></div>
                  </div>

                  <button
                    className="details-btn"
                    onClick={() =>
                      handleViewDetails(item.destinationId)
                    }
                  >
                    Explore Destination
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Destination Details Popup */}

      {showModal && selectedDestination && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button
              className="close-btn"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            <img
              className="modal-image"
              src={`http://localhost:5055${selectedDestination.imageUrl}`}
              alt={selectedDestination.name}
            />

            <h2>{selectedDestination.name}</h2>

            <p>{selectedDestination.description}</p>

            <hr />

            <h3>Activities</h3>

            {selectedDestination.activities.length === 0 ? (
              <p>No activities available.</p>
            ) : (
              selectedDestination.activities.map((activity, index) => (
                <div
                  className="activity-card"
                  key={index}
                >
                  <img
                    className="activity-image"
                    src={`http://localhost:5055${activity.imageUrl}`}
                    alt={activity.activityName}
                  />

                  <h4>{activity.activityName}</h4>

                  <p>
                    <strong>Category:</strong>{" "}
                    {activity.category}
                  </p>

                  <p>
                    <strong>Time Slot:</strong>{" "}
                    {activity.timeSlot}
                  </p>
<br/>
                  <p>
                    <strong>Duration:</strong>{" "}
                    {activity.durationHours} Hours
                  </p>

                  <p>
                    <strong>Estimated Cost:</strong> Rs.{" "}
                    {activity.estimatedCost}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Recommendation;