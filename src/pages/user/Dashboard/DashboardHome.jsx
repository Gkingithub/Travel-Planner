import React, { useEffect, useState, useCallback,useRef  } from "react";
import Swal from "sweetalert2";
import "./Dashboard.css";
import Select from "react-select";

import {
  getDestinations,
  searchDestinations,
} from "../../../service/userDestinationService";

import {
  getDashboard,
  generateItinerary,
} from "../../../service/dashboardService";

import { saveTrip } from "../../../service/tripService";

import { useNavigate, useLocation } from "react-router-dom";

import { FaMountain } from "react-icons/fa";
import { GiForestCamp } from "react-icons/gi";
import { MdTempleBuddhist } from "react-icons/md";

import debounce from "lodash.debounce";

function DashboardHome() {
  const navigate = useNavigate();
  const location = useLocation();

  // =============================
  // Logged In User
  // =============================

  const [user, setUser] = useState({});

  // =============================
  // Header Search
  // =============================

  const [headerSearch, setHeaderSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);

  // =============================
  // Dashboard Stats
  // =============================

  const [dashboard, setDashboard] = useState({
    totalTrips: 0,
    totalDestinations: 0,
    uniqueDestinations: 0,
    upcomingTrips: 0,
  });

  // =============================
  // Destinations
  // =============================

  const [destinations, setDestinations] = useState([]);
  const [search, setSearch] = useState("");

  // =============================
  // Generated Plan
  // =============================

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
const startDateRef = useRef(null);
  // =============================
  // Trip Form
  // =============================

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

  // =============================
  // ENTER KEY NEXT FIELD
  // =============================

  const handleEnterKey = (e) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const form = e.target.form;

    if (!form) return;

    const elements = Array.from(form.elements).filter(
      (el) =>
        !el.disabled &&
        el.type !== "hidden" &&
        el.tabIndex !== -1
    );

    const index = elements.indexOf(e.target);

    if (index > -1 && index < elements.length - 1) {
      elements[index + 1].focus();
    } else {
      generatePlan();
    }
  };

  // =============================
  // Header Search Debounce
  // =============================

  const searchDestination = useCallback(
    debounce(async (keyword) => {
      if (!keyword.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        const response = await searchDestinations(keyword);

        if (response.success) {
          setSearchResults(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }, 500),
    []
  );

  const handleHeaderSearch = (e) => {
    const value = e.target.value;
    setHeaderSearch(value);
    searchDestination(value);
  };

  const handleDestinationClick = (destination) => {
    navigate("/dashboard/destinations", {
      state: {
        destinationId: destination.destinationId,
      },
    });
  };

  const destinationOptions = destinations.map((destination) => ({
    value: destination.destinationId,
    label: `${destination.name} - ${destination.city}, ${destination.country}`,
  }));

  const filteredDestinations = destinations.filter((destination) =>
    `${destination.name} ${destination.city} ${destination.country}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const storedUser = localStorage.getItem("user");

    const currentUser = loggedInUser
      ? JSON.parse(loggedInUser)
      : storedUser
      ? JSON.parse(storedUser)
      : {};

    setUser(currentUser);

    loadDashboard();
    loadDestinations();
  }, [location]);  // =============================
  // Dashboard Data
  // =============================

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

  // =============================
  // Load Destinations
  // =============================

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

  // =============================
  // Start Date Change
  // =============================

  const handleStartDateChange = (e) => {
    const startDate = e.target.value;

    let days = "";

    if (startDate && trip.endDate) {
      const diff =
        (new Date(trip.endDate) - new Date(startDate)) /
        (1000 * 60 * 60 * 24);

      if (diff >= 0) {
        days = diff + 1;
      }
    }

    setTrip({
      ...trip,
      startDate,
      days,
    });
  };

  // =============================
  // End Date Change
  // =============================

  const handleEndDateChange = (e) => {
    const endDate = e.target.value;

    let days = "";

    if (trip.startDate && endDate) {
      const diff =
        (new Date(endDate) - new Date(trip.startDate)) /
        (1000 * 60 * 60 * 24);

      if (diff >= 0) {
        days = diff + 1;
      }
    }

    setTrip({
      ...trip,
      endDate,
      days,
    });
  };

  // =============================
  // Input Change
  // =============================

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "budget" || name === "travelers") {
      if (value < 0) return;
    }

    setTrip((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =============================
  // Generate Itinerary
  // =============================

  const generatePlan = async () => {
    if (
      !trip.destination ||
      !trip.startDate ||
      !trip.endDate ||
      !trip.days ||
      !trip.travelers ||
      !trip.transport ||
      !trip.hotel ||
      !trip.travelType
    ) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please complete all required fields.",
      });
      return;
    }

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

    if (Number(trip.days) <= 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid Days",
        text: "Days must be greater than zero.",
      });
      return;
    }

    if (Number(trip.travelers) <= 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid Travellers",
        text: "Travellers must be at least 1.",
      });
      return;
    }

    const request = {
      destinationId: Number(trip.destination),
      travelDate: trip.startDate,
      days: Number(trip.days),
      travellers: Number(trip.travelers),
      transportation: trip.transport,
      hotelCategory: trip.hotel,
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
  };  // =============================
  // Save Trip
  // =============================

  const handleSaveTrip = async () => {
    if (!plan) {
      Swal.fire({
        icon: "warning",
        title: "No itinerary",
        text: "Generate an itinerary first.",
      });
      return;
    }

    const request = {
      destinationId: Number(trip.destination),
      travelDate: trip.startDate,
      days: Number(trip.days),
      travellers: Number(trip.travelers),
      transportation: trip.transport,
      hotelCategory: trip.hotel,
      budget: Number(plan.estimatedBudget),
      travelType: trip.travelType,

      itineraries: plan.days.map((day) => ({
        dayNumber: day.day,
        morning: day.activities[0] || "",
        afternoon: day.activities[1] || "",
        evening: day.activities[2] || "",
        estimatedCost: day.estimatedCost || 0,
      })),
    };

    try {
      const response = await saveTrip(request);

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Trip Saved",
          text: "Trip has been added to My Trips.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Unable to save trip.",
      });
    }
  };

  // =============================
  // JSX START
  // =============================

  return (
    <div className="dashboard-home">
      {/* Header */}

      <div className="dashboard-header">
        <div className="profile-section">
          {/* <img
            src={
              user.profileImage
                ? `http://localhost:5055${user.profileImage}`
                : "/default-profile.png"
            }
            alt="Profile"
            className="profile-avatar"
          /> */}

          <div className="profile-info">
            <h2>
              Welcome,{" "}
              {user.fullName ||
                user.name ||
                user.username ||
                "Traveller"}
            </h2>

            <p>Let's plan your next adventure ✈</p>
          </div>
        </div>

        {/* Header Search */}

        <div className="header-search">
          <input
            type="text"
            placeholder="Search destination..."
            value={headerSearch}
            onChange={handleHeaderSearch}
          />

          {searchResults.length > 0 && (
            <div className="search-dropdown">
              {searchResults.map((destination) => (
                <div
                  key={destination.destinationId}
                  className={
                    selectedDestination === destination.destinationId
                      ? "search-item active"
                      : "search-item"
                  }
                  onClick={() => handleDestinationClick(destination)}
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
                      {destination.city}, {destination.country}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
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

      <div className="dashboard-main">
        {/* Planner Form */}

        <form
          className="planner-card"
          onSubmit={(e) => {
            e.preventDefault();
            generatePlan();
          }}
        >
          <h2>Create Travel Plan</h2>

          <div className="planner-grid">           
         <Select
  name="destination"
  options={destinationOptions}
  value={
    destinationOptions.find(
      (option) => option.value === Number(trip.destination)
    ) || null
  }
  onChange={(selectedOption) => {
    setTrip({
      ...trip,
      destination: selectedOption ? selectedOption.value : "",
    });

    // After selecting, move to Start Date
    setTimeout(() => {
      startDateRef.current?.focus();
    }, 100);
  }}
  placeholder="Search Destination..."
  isSearchable
  maxMenuHeight={180}
/>

            {/* Start Date */}
<input
  ref={startDateRef}
  type="date"
  name="startDate"
  value={trip.startDate}
  min={new Date().toISOString().split("T")[0]}
  onChange={handleStartDateChange}
  onKeyDown={handleEnterKey}
/>

            {/* End Date */}

            <input
              type="date"
              name="endDate"
              value={trip.endDate}
              min={trip.startDate}
              onChange={handleEndDateChange}
              onKeyDown={handleEnterKey}
            />

            {/* Days */}

            <input
              type="number"
              name="days"
              value={trip.days}
              placeholder="Days"
              readOnly
              onKeyDown={handleEnterKey}
            />

            {/* Travellers */}

            <input
              type="number"
              name="travelers"
              min="1"
              value={trip.travelers}
              placeholder="Travellers"
              onChange={handleChange}
              onKeyDown={handleEnterKey}
            />

            {/* Travel Type */}

            <select
              name="travelType"
              value={trip.travelType}
              onChange={handleChange}
              onKeyDown={handleEnterKey}
            >
              <option value="">Travel Type</option>
              <option value="Solo">Solo</option>
              <option value="Couple">Couple</option>
              <option value="Family">Family</option>
              <option value="Friends">Friends</option>
            </select>

            {/* Transportation */}

            <select
              name="transport"
              value={trip.transport}
              onChange={handleChange}
              onKeyDown={handleEnterKey}
            >
              <option value="">Transportation</option>
              <option value="Flight">Flight</option>
              <option value="Bus">Bus</option>
              <option value="Private Vehicle">
                Private Vehicle
              </option>
            </select>

            {/* Hotel */}

            <select
              name="hotel"
              value={trip.hotel}
              onChange={handleChange}
              onKeyDown={handleEnterKey}
            >
              <option value="">Hotel Category</option>
              <option value="Budget Hotel">Budget Hotel</option>
              <option value="3 Star Hotel">3 Star Hotel</option>
              <option value="4 Star Hotel">4 Star Hotel</option>
              <option value="5 Star Hotel">5 Star Hotel</option>
            </select>
          </div>

          <button
            type="submit"
            className="generate-btn"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Plan"}
          </button>
        </form>

        {/* Right Panel */}

        <div className="right-panel">
          <div className="side-card">
            <h2>Popular Destinations</h2>

            <input
              type="text"
              placeholder="Search destination..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="destination-search"
            />            {filteredDestinations.length === 0 ? (
              <p>No destinations found.</p>
            ) : (
              filteredDestinations
                .slice(0, 3)
                .map((destination) => (
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
                        {destination.city}, {destination.country}
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

      {/* Itinerary */}

      {plan && (
        <div className="itinerary-card">
          <div className="itinerary-header">
            <h2>Your Travel Itinerary</h2>

            <p>Your personalized travel plan is ready.</p>
          </div>

          {/* Summary */}

          <div className="summary-grid">
            <div className="summary-box">
              <span>Destination</span>
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
              <span>Estimated Budget</span>
              <h3>Rs. {plan.estimatedBudget}</h3>
            </div>
          </div>

          {/* Timeline */}

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