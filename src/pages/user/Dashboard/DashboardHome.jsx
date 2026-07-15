import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./Dashboard.css";
import Select from "react-select";
import { getDestinations } from "../../../service/userDestinationService";
import { getDashboard } from "../../../service/dashboardService";
import { generateItinerary } from "../../../service/dashboardService";
import { saveTrip } from "../../../service/tripService";
const user = JSON.parse(localStorage.getItem("user"));
const userName = user?.fullName;
function DashboardHome() {
  const [dashboard, setDashboard] = useState({
    totalTrips: 0,
    totalDestinations: 0,
    uniqueDestinations: 0,
    upcomingTrips: 0,
  });


  const handleStartDateChange = (e) => {

    const startDate = e.target.value;

    let days = "";

    if (startDate && trip.endDate) {

      const diff =
        (new Date(trip.endDate) - new Date(startDate))
        / (1000 * 60 * 60 * 24);

      if (diff >= 0)
        days = diff + 1;
    }

    setTrip({
      ...trip,
      startDate,
      days
    });
  };
  const handleEndDateChange = (e) => {

    const endDate = e.target.value;

    let days = "";

    if (trip.startDate && endDate) {

      const diff =
        (new Date(endDate) - new Date(trip.startDate))
        / (1000 * 60 * 60 * 24);

      if (diff >= 0)
        days = diff + 1;
    }

    setTrip({
      ...trip,
      endDate,
      days
    });
  };
  const [destinations, setDestinations] = useState([]);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [trip, setTrip] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    days: "",
    budget: "",
    travelers: "",
    travelType: "",
    transport: "",
    hotel: "",
    interests: [],
  });
  const destinationOptions = destinations.map((destination) => ({
    value: destination.destinationId,
    label: `${destination.name} - ${destination.city}, ${destination.country}`,
  }));
  useEffect(() => {
    loadDashboard();
    loadDestinations();
  }, []);

  const loadDashboard = async () => {
    try {

      const response = await getDashboard();

      if (response.success) {
        setDashboard(response.data);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const loadDestinations = async () => {

    try {

      const response = await getDestinations();

      if (response.success) {
        setDestinations(response.data);
      }

    } catch (error) {

      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to load destinations.",
      });

    }

  };

  // ==============================
  // Handle Inputs
  // ==============================

  const handleChange = (e) => {

    const { name, value } = e.target;

    if (name === "budget" || name === "travelers") {

      if (value < 0) {
        return;
      }

    }

    setTrip({
      ...trip,
      [name]: value,
    });

  };

  const handleInterestChange = (e) => {

    const { value, checked } = e.target;

    if (checked) {

      setTrip({
        ...trip,
        interests: [...trip.interests, value],
      });

    } else {

      setTrip({
        ...trip,
        interests: trip.interests.filter(
          (interest) => interest !== value
        ),
      });

    }

  };

  // ==============================
  // Generate Plan
  // ==============================

  const generatePlan = async () => {

    // Required Validation

    if (
      !trip.destination ||
      !trip.startDate ||
      !trip.endDate ||
      !trip.days ||
      !trip.budget ||
      !trip.travelers ||
      !trip.transport ||
      !trip.hotel ||
      !trip.travelType
    ) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please complete all required fields."
      });

      return;
    }

    // Date Validation

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDate = new Date(trip.startDate);
    const endDate = new Date(trip.endDate);

    if (startDate < today) {

      Swal.fire({
        icon: "error",
        title: "Invalid Date",
        text: "Travel date cannot be in the past.",
      });

      return;
    }

    if (endDate < startDate) {

      Swal.fire({
        icon: "error",
        title: "Invalid Date",
        text: "End date cannot be before start date.",
      });

      return;
    }

    // Number Validation

    if (Number(trip.days) <= 0) {

      Swal.fire({
        icon: "error",
        title: "Invalid Days",
        text: "Days must be greater than zero.",
      });

      return;
    }

    if (Number(trip.budget) <= 0) {

      Swal.fire({
        icon: "error",
        title: "Invalid Budget",
        text: "Budget must be greater than zero.",
      });

      return;
    }

    if (Number(trip.travelers) <= 0) {

      Swal.fire({
        icon: "error",
        title: "Invalid Travellers",
        text: "Travellers must be greater than zero.",
      });

      return;
    }
    if (Number(trip.budget) <= 0) {

      Swal.fire({
        icon: "error",
        title: "Invalid Budget",
        text: "Budget must be greater than zero."
      });

      return;
    }
    if (Number(trip.travelers) <= 0) {

      Swal.fire({
        icon: "error",
        title: "Invalid Number",
        text: "Travellers must be at least 1."
      });

      return;
    }
    // Prepare Request

    const request = {

      destinationId: Number(trip.destination),

      travelDate: trip.startDate,

      days: Number(trip.days),

      budget: Number(trip.budget),

      travellers: Number(trip.travelers),

      transportation: trip.transport,

      hotelCategory: trip.hotel,

      adventure: trip.interests.includes("Adventure") ? 1 : 0,

      nature: trip.interests.includes("Nature") ? 1 : 0,

      culture: trip.interests.includes("Cultural") ? 1 : 0,

      luxury: trip.interests.includes("Luxury") ? 1 : 0,

      wildlife: trip.interests.includes("Wildlife") ? 1 : 0,

      trekking: 0,

      family: 0,

      relaxation: 0,

      religious: trip.interests.includes("Religious") ? 1 : 0,

      nightLife: 0,

      travelType: trip.travelType,
    };

    try {

      setLoading(true);

      const response = await generateItinerary(request);

      if (response.success) {

        setPlan(response.data);

        Swal.fire({
          icon: "success",
          title: "Travel Plan Generated",
          timer: 1500,
          showConfirmButton: false,
        });

      }

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Generation Failed",
        text:
          error.response?.data?.message ||
          "Unable to generate itinerary.",
      });

    } finally {

      setLoading(false);

    }

  };
  const handleSaveTrip = async () => {
    if (!plan) {
      Swal.fire({
        icon: "warning",
        title: "No itinerary",
        text: "Generate an itinerary first."
      });
      return;
    }

    const request = {
      destinationId: Number(trip.destination),
      travelDate: trip.startDate,
      days: Number(trip.days),
      budget: Number(trip.budget),
      travellers: Number(trip.travelers),
      transportation: trip.transport,
      hotelCategory: trip.hotel,
      travelType: trip.travelType,
      itineraries: plan.days.map(day => ({
        dayNumber: day.day,
        morning: day.activities[0] || "",
        afternoon: day.activities[1] || "",
        evening: day.activities[2] || "",
        estimatedCost: day.estimatedCost || 0
      }))
    };

    try {
      const response = await saveTrip(request);

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Trip Saved",
          text: "Trip has been added to My Trips."
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Unable to save trip."
      });
    }
  };
  return (

    <div className="dashboard-home">
      {/* Header */}

      <div className="dashboard-header">

        <div>

          <div className="dashboard-header">
            <div className="profile-section">


              <div className="profile-info">
                <h2>Welcome, {userName}</h2>

              </div>

            </div>
          </div>


        </div>

      </div>

      {/* Statistics */}

      <div className="stats-grid">

        <div className="stat-card">
          <h4>Total Trips</h4>
          <h2>{dashboard.totalTrips}</h2>
        </div>

        <div className="stat-card">
          <h4>Total Destinations</h4>
          <h2>{dashboard.totalDestinations}</h2>
        </div>

        <div className="stat-card">
          <h4>Unique Destinations</h4>
          <h2>{dashboard.uniqueDestinations}</h2>
        </div>

        <div className="stat-card">
          <h4>Upcoming Trips</h4>
          <h2>{dashboard.upcomingTrips}</h2>
        </div>

      </div>

      {/* Main */}

      <div className="dashboard-main">

        {/* Planner */}

        <div className="planner-card">

          <h2>Create Travel Plan</h2>

          <div className="planner-grid">

            {/* Destination */}

            <Select
              name="destination"
              options={destinationOptions}
              value={
                destinationOptions.find(
                  (option) => option.value === Number(trip.destination)
                ) || null
              }
              onChange={(selectedOption) =>
                setTrip({
                  ...trip,
                  destination: selectedOption
                    ? selectedOption.value
                    : "",
                })
              }
              placeholder="Search Destination..."
              isSearchable={true}
              maxMenuHeight={180}
            />

            {/* Start Date */}

            <input
              type="date"
              name="startDate"
              value={trip.startDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={handleStartDateChange}
            />

            <input
              type="date"
              name="endDate"
              value={trip.endDate}
              min={trip.startDate}
              onChange={handleEndDateChange}
            />

            {/* Days */}

            <input
              type="number"
              name="days"
              value={trip.days}
              placeholder="Days"
              readOnly
            />

            {/* Budget */}

            <input
              type="number"
              name="budget"
              min="1"
              value={trip.budget}
              placeholder="Budget"
              onChange={handleChange}
            />
            {/* Travellers */}

            <input
              type="number"
              name="travelers"
              min="1"
              value={trip.travelers}
              placeholder="Travellers"
              onChange={handleChange}
            />

            {/* Travel Type */}

            <select
              name="travelType"
              value={trip.travelType}
              onChange={handleChange}
            >
              <option value="">
                Travel Type
              </option>

              <option value="Solo">
                Solo
              </option>

              <option value="Couple">
                Couple
              </option>

              <option value="Family">
                Family
              </option>

              <option value="Friends">
                Friends
              </option>

            </select>

            {/* Transportation */}

            <select
              name="transport"
              value={trip.transport}
              onChange={handleChange}
            >

              <option value="">
                Transportation
              </option>

              <option value="Flight">
                Flight
              </option>

              <option value="Bus">
                Bus
              </option>

              <option value="Private Vehicle">
                Private Vehicle
              </option>

            </select>

            {/* Hotel */}

            <select
              name="hotel"
              value={trip.hotel}
              onChange={handleChange}
            >

              <option value="">
                Hotel Category
              </option>

              <option value="Budget Hotel">
                Budget Hotel
              </option>

              <option value="3 Star Hotel">
                3 Star Hotel
              </option>

              <option value="4 Star Hotel">
                4 Star Hotel
              </option>

              <option value="5 Star Hotel">
                5 Star Hotel
              </option>

            </select>

            {/* Interests */}

            <div className="interest-section full-width">

              <label className="interest-title">

                Select Interests

              </label>

              <div className="interest-list">

                <label>

                  <input
                    type="checkbox"
                    value="Adventure"
                    checked={trip.interests.includes("Adventure")}
                    onChange={handleInterestChange}
                  />

                  Adventure

                </label>

                <label>

                  <input
                    type="checkbox"
                    value="Nature"
                    checked={trip.interests.includes("Nature")}
                    onChange={handleInterestChange}
                  />

                  Nature

                </label>

                <label>

                  <input
                    type="checkbox"
                    value="Wildlife"
                    checked={trip.interests.includes("Wildlife")}
                    onChange={handleInterestChange}
                  />

                  Wildlife

                </label>

                <label>

                  <input
                    type="checkbox"
                    value="Religious"
                    checked={trip.interests.includes("Religious")}
                    onChange={handleInterestChange}
                  />

                  Religious

                </label>

                <label>

                  <input
                    type="checkbox"
                    value="Cultural"
                    checked={trip.interests.includes("Cultural")}
                    onChange={handleInterestChange}
                  />

                  Cultural

                </label>

                <label>

                  <input
                    type="checkbox"
                    value="Luxury"
                    checked={trip.interests.includes("Luxury")}
                    onChange={handleInterestChange}
                  />

                  Luxury

                </label>

              </div>

            </div>

          </div>

          <button
            className="generate-btn"
            onClick={generatePlan}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Plan"}
          </button>

        </div>

        {/* Right Panel Starts Here */}

        <div className="right-panel">          {/* Popular Destinations */}

          <div className="side-card">

            <h2>Popular Destinations</h2>

            {destinations.length === 0 ? (

              <p>No destinations available.</p>

            ) : (

              destinations.slice(0, 5).map((destination) => (

                <div
                  className="mini-card"
                  key={destination.destinationId}
                >

                  <img

                    src={
                      destination.imageUrl
                        ? `http://localhost:5055${destination.imageUrl}`
                        : "/placeholder.jpg"
                    }
                    alt={destination.name}
                  />

                  <div>

                    <h4>{destination.name}</h4>

                    <p>
                      {destination.city},{" "}
                      {destination.country}
                    </p>

                    <span>
                      Budget: Rs. {destination.averageBudget}
                    </span>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

      {/* Generated Itinerary */}
      {/* Generated Itinerary */}

      {plan && (

        <div className="itinerary-card">

          <div className="itinerary-header">

            <h2>✈ Your Travel Itinerary</h2>

            <p>Your personalized travel plan is ready.</p>

          </div>

          <div className="summary-grid">

            <div className="summary-box">

              <span> Destination</span>

              <h3>{plan.destination}</h3>

            </div>

            <div className="summary-box">

              <span>Hotel</span>

              <h3>{plan.hotelName}</h3>

            </div>

            <div className="summary-box">

              <span>Transportation</span>

              <h3>{plan.transportation}</h3>

            </div>

            <div className="summary-box">

              <span>💰 Estimated Budget</span>

              <h3>Rs. {plan.estimatedBudget}</h3>

            </div>

          </div>

          <div className="timeline">

            {plan.days.map((day) => (

              <div
                className="timeline-card"
                key={day.day}
              >

                <div className="timeline-number">

                  Day {day.day}

                </div>

                <div className="timeline-content">

                  <ul>

                    {day.activities.map((activity, index) => (

                      <li key={index}>
                        ✅ {activity}
                      </li>

                    ))}

                  </ul>

                </div>

              </div>

            ))}

          </div>

          <div className="save-trip-container">

            <button
              className="save-trip-btn"
              onClick={handleSaveTrip}
            >
              Save Trip
            </button>

          </div>

        </div>

      )}

    </div>

  );

}

export default DashboardHome;