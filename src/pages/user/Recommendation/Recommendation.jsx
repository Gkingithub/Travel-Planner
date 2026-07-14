import React, { useState } from "react";
import "./Recommendation.css";
import { getRecommendations } from "../../../service/RecommendationService";

function Recommendation() {
  const [preferences, setPreferences] = useState({
    adventure: 0,
    nature: 0,
    wildlife: 0,
    religious: 0,
    cultural: 0,
    luxury: 0,
    trekking: 0,
  });

  const [recommendations, setRecommendations] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPreferences((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleRecommend = async () => {
    try {
      const request = {
        adventure: preferences.adventure,
        nature: preferences.nature,
        culture: preferences.cultural,
        luxury: preferences.luxury,
        wildlife: preferences.wildlife,
        trekking: preferences.trekking,
        religious: preferences.religious,
      };

      const response = await getRecommendations(request);

      if (response.success) {
        setRecommendations(response.data);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Recommendation Error:", error);

      if (error.response?.status === 401) {
        alert("Unauthorized. Please log in again.");
      } else {
        alert("Failed to get recommendations.");
      }
    }
  };

  return (
    <div className="recommend-page">
      <h1>Destination Recommendation</h1>

      <div className="recommend-form">
        <h3>Select Your Interests</h3>

        {/* Adventure */}
        <label>
          Adventure <strong>{preferences.adventure}/10</strong>
        </label>
        <input
          type="range"
          min="0"
          max="10"
          step="1"
          name="adventure"
          value={preferences.adventure}
          onChange={handleChange}
        />

        {/* Nature */}
        <label>
          Nature <strong>{preferences.nature}/10</strong>
        </label>
        <input
          type="range"
          min="0"
          max="10"
          step="1"
          name="nature"
          value={preferences.nature}
          onChange={handleChange}
        />

        {/* Wildlife */}
        <label>
          Wildlife <strong>{preferences.wildlife}/10</strong>
        </label>
        <input
          type="range"
          min="0"
          max="10"
          step="1"
          name="wildlife"
          value={preferences.wildlife}
          onChange={handleChange}
        />

        {/* Religious */}
        <label>
          Religious <strong>{preferences.religious}/10</strong>
        </label>
        <input
          type="range"
          min="0"
          max="10"
          step="1"
          name="religious"
          value={preferences.religious}
          onChange={handleChange}
        />

        {/* Cultural */}
        <label>
          Cultural <strong>{preferences.cultural}/10</strong>
        </label>
        <input
          type="range"
          min="0"
          max="10"
          step="1"
          name="cultural"
          value={preferences.cultural}
          onChange={handleChange}
        />

        {/* Luxury */}
        <label>
          Luxury <strong>{preferences.luxury}/10</strong>
        </label>
        <input
          type="range"
          min="0"
          max="10"
          step="1"
          name="luxury"
          value={preferences.luxury}
          onChange={handleChange}
        />

        {/* Trekking */}
        <label>
          Trekking <strong>{preferences.trekking}/10</strong>
        </label>
        <input
          type="range"
          min="0"
          max="10"
          step="1"
          name="trekking"
          value={preferences.trekking}
          onChange={handleChange}
        />

        <button
          className="recommend-btn"
          onClick={handleRecommend}
        >
          Get Recommendations
        </button>
      </div>      {recommendations.length > 0 && (
        <div className="recommend-results">
          <h2>Recommended Destinations</h2>

          {recommendations.map((item) => (
            <div className="recommend-card" key={item.destinationId}>
              <div className="recommend-card-header">
                <h3>{item.destinationName}</h3>

                <span className="similarity-badge">
                  {(item.similarity * 100).toFixed(1)}% Match
                </span>
              </div>

              <div className="recommend-card-body">
                <p>
                  <strong>Similarity Score:</strong>{" "}
                  {item.similarity.toFixed(4)}
                </p>

                {item.description && (
                  <p className="recommend-description">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Recommendation;