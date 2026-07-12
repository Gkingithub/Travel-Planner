import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Recommendation.css";
import { getRecommendations } from "../../../service/RecommendationService";
function Recommendation() {
  const [preferences, setPreferences] = useState({
    adventure: false,
    nature: false,
    wildlife: false,
    religious: false,
    cultural: false,
    luxury: false,
    budget: "Medium",
    days: "",
  });

  const [recommendations, setRecommendations] = useState([]);

const handleChange = (e) => {
  const { name, type, checked, value } = e.target;

  setPreferences({
    ...preferences,
    [name]: type === "checkbox" ? checked : value,
  });
};

const handleRecommend = async () => {
  try {
    const request = {
      travelDate: new Date().toISOString(),
      days: Number(preferences.days),
      budget:
        preferences.budget === "Low"
          ? 20000
          : preferences.budget === "Medium"
          ? 50000
          : 100000,
      travellers: 2,
      transportation: "Bus",
      hotelCategory: preferences.budget,

      adventure: preferences.adventure ? 9 : 1,
      nature: preferences.nature ? 9 : 1,
      culture: preferences.cultural ? 9 : 1,
      luxury: preferences.luxury ? 9 : 1,
      wildlife: preferences.wildlife ? 9 : 1,
      trekking: preferences.trekking ? 9 : 1,
      religious: preferences.religious ? 9 : 1,
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

        <label>
          <input
            type="checkbox"
            name="adventure"
            checked={preferences.adventure}
            onChange={handleChange}
          />
          Adventure
        </label>

        <label>
          <input
            type="checkbox"
            name="nature"
            checked={preferences.nature}
            onChange={handleChange}
          />
          Nature
        </label>

        <label>
          <input
            type="checkbox"
            name="wildlife"
            checked={preferences.wildlife}
            onChange={handleChange}
          />
          Wildlife
        </label>

        <label>
          <input
            type="checkbox"
            name="religious"
            checked={preferences.religious}
            onChange={handleChange}
          />
          Religious
        </label>

        <label>
          <input
            type="checkbox"
            name="cultural"
            checked={preferences.cultural}
            onChange={handleChange}
          />
          Cultural
        </label>

        <label>
          <input
            type="checkbox"
            name="luxury"
            checked={preferences.luxury}
            onChange={handleChange}
          />
          Luxury
        </label>

        <label>
          <input
            type="checkbox"
            name="Trekking"
            checked={preferences.luxury}
            onChange={handleChange}
          />
          Trekking
        </label>

        <h3>Budget</h3>

        <select
          name="budget"
          value={preferences.budget}
          onChange={handleChange}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <h3>Trip Duration (Days)</h3>

        <input
          type="number"
          name="days"
          value={preferences.days}
          onChange={handleChange}
        />

        <button
          className="recommend-btn"
          onClick={handleRecommend}
        >
          Get Recommendations
        </button>

      </div>

      {recommendations.length > 0 && (

        <div className="recommend-results">

          <h2>Recommended Destinations</h2><br></br>

          {recommendations.map((item) => (

            <div className="recommend-card" key={item.destinationId}>

              <h3>{item.destinationName}</h3>

              <p>
                <strong>Similarity:</strong> {item.similarity}
              </p>

              <p>{item.description}</p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Recommendation;