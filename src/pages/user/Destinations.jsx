import React, { useEffect, useState } from "react";
import "./Destination.css";
import {
  getPopularDestinations,
} from "../../service/popularDestinationService";
import {
  getDestinationActivities,
} from "../../service/userDestinationService";

function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);

  useEffect(() => {
    loadPopularDestinations();
  }, []);

  const loadPopularDestinations = async () => {
    setLoading(true);

    try {
      const response = await getPopularDestinations();

      if (response.success) {
        setDestinations(response.data);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

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
    <div className="page">

      <h1>Popular Destinations</h1>

      <br />

      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <div className="destination-grid">

          {destinations.map((place) => (

            <div
              className="destination-card"
              key={place.destinationId}
            >

              <img
                src={`http://localhost:5055${place.imageUrl}`}
                alt={place.name}
              />

              <div className="destination-info">

                <h2>{place.name}</h2>

                <p>{place.description}</p>

                <h3>Rs. {place.averageBudget}</h3>

                <p>
                  <strong>Total Bookings:</strong>{" "}
                  {place.totalBookings}
                </p>

                <button
                  onClick={() =>
                    handleViewDetails(place.destinationId)
                  }
                >
                  View Details
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

      {/* Popup */}

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

              selectedDestination.activities.map(
                (activity, index) => (

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

                    <p>
                      <strong>Duration:</strong>{" "}
                      {activity.durationHours} Hours
                    </p>

                    <p>
                      <strong>Estimated Cost:</strong>{" "}
                      Rs. {activity.estimatedCost}
                    </p>

                  </div>

                )
              )

            )}

          </div>

        </div>

      )}

    </div>
  );
}

export default Destinations;