import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Recommendation.css";

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

  const handleRecommend = () => {
    // Dummy recommendations
    setRecommendations([
      {
        id: 1,
        destination: "Pokhara",
        similarity: "96%",
        description: "Perfect for adventure and nature lovers.",
      },
      {
        id: 2,
        destination: "Chitwan",
        similarity: "87%",
        description: "Ideal for wildlife enthusiasts.",
      },
      {
        id: 3,
        destination: "Mustang",
        similarity: "81%",
        description: "Great for cultural exploration.",
      },
    ]);
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

            <div className="recommend-card" key={item.id}>

              <h3>{item.destination}</h3>

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