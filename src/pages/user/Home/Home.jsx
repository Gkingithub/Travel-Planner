import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Home.css";
import { getRandomDestinations } from "../../../service/randomDestinationService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapLocationDot,
  faRoute,
  faWallet,
  faHotel,
} from "@fortawesome/free-solid-svg-icons";
function Home() {
  const navigate = useNavigate();

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDashboardClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    } else {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to access your dashboard.",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  useEffect(() => {
    loadPopularDestinations();
  }, []);

  const loadPopularDestinations = async () => {
    try {
      const response = await getRandomDestinations();

      console.log(response);

      if (response.success) {
        setDestinations(response.data);
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Failed to load destinations.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      {/* ================= NAVBAR ================= */}

      <nav className="navbar">
        <div className="logo">
          <h2>YATRIQ</h2>
        </div>

        <div className="nav-links">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleDashboardClick();
            }}
          >
            Dashboard
          </a>

          <a href="#destinations">Destinations</a>

          <a href="#statistics">Statistics</a>

          <a href="#footer">Contact</a>

          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>

          <Link to="/register">
            <button className="register-btn">Register</button>
          </Link>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}

      <div className="banner">
        <section className="hero" id="home">
          <div className="hero-content">
            <h1>
              Plan Smarter,
              <br />
              Travel Better.
            </h1>

            <p>
              Discover Nepal's most beautiful destinations, create personalized
              itineraries, estimate your travel budget, and enjoy hassle-free
              adventures with YatriQ.
            </p>

            <div className="hero-buttons">
              <Link to="/register">
                <button className="primary-btn">
                  <h3>Get Started</h3>
                </button>
              </Link>

              <Link to="/login">
                <button className="secondary-btn">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* ================= POPULAR DESTINATIONS ================= */}

      <section className="destination-section" id="destinations">
        <div className="section-heading">
          <h1>Popular Destinations</h1>

          <p style={{ marginBottom: "35px" }}>
            Explore some of Nepal's most loved travel destinations recommended
            by YatriQ.
          </p>
        </div>

        {loading ? (
          <div className="loading-container">
            <h3>Loading destinations...</h3>
          </div>
        ) : (
          <div className="destination-grid">
            {destinations.length > 0 ? (
              destinations.map((destination) => (
                <div
                  className="destination-card"
                  key={destination.destinationId}
                >
                  <img
                    src={
                      destination.imageUrl
                        ? destination.imageUrl
                        : "/placeholder.jpg"
                    }
                    alt={destination.name}
                  />

                  <div className="destination-content">
                    <h3>{destination.name}</h3>

                    <p>
                      {destination.description
                        ? destination.description
                        : "Discover this amazing destination with YatriQ."}
                    </p>

                    <span>Estimated Budget</span>

                    <h4>
                      Rs.{" "}
                      {destination.averageBudget
                        ? Number(destination.averageBudget).toLocaleString()
                        : "N/A"}
                    </h4>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-destination">
                <h3>No destinations available.</h3>
              </div>
            )}
          </div>
        )}
      </section>
{/* ================= WHY CHOOSE YATRIQ ================= */}



<section className="features-section">
  <div className="section-heading">
    <h1>Why Choose YatriQ?</h1>

    <p style={{ marginBottom: "35px", marginTop: "10px" }}>
      Experience smarter travel planning with AI-powered recommendations and
      personalized itineraries.
    </p>
  </div>

  <div className="features-grid">

    <div className="feature-card">
      <div className="feature-icon">
        <FontAwesomeIcon icon={faMapLocationDot} />
      </div>

      <h3>Destination Recommendations</h3>

      <p>
        Discover destinations based on your interests, travel style and budget.
      </p>
    </div>

    <div className="feature-card">
      <div className="feature-icon">
        <FontAwesomeIcon icon={faRoute} />
      </div>

      <h3>Smart Itinerary</h3>

      <p>
        Automatically generate complete travel plans within seconds.
      </p>
    </div>

    <div className="feature-card">
      <div className="feature-icon">
        <FontAwesomeIcon icon={faWallet} />
      </div>

      <h3>Budget Planner</h3>

      <p>
        Estimate your travel expenses before you start your journey.
      </p>
    </div>

    <div className="feature-card">
      <div className="feature-icon">
        <FontAwesomeIcon icon={faHotel} />
      </div>

      <h3>Hotel Suggestions</h3>

      <p>
        Find comfortable hotels that perfectly fit your travel budget.
      </p>
    </div>

  </div>
</section>
      {/* ================= STATISTICS ================= */}

      <section className="statistics" id="statistics">
        <div className="container">
          <div className="statistics-heading">
            <h2>Trusted Across Nepal</h2>

            <p>
              Thousands of travelers use YatriQ to discover destinations, plan
              trips, and create unforgettable travel memories.
            </p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <h3>120+</h3>
              <span>Destinations</span>
            </div>

            <div className="stat-card">
              <h3>500+</h3>
              <span>Travel Plans</span>
            </div>

            <div className="stat-card">
              <h3>250+</h3>
              <span>Hotels</span>
            </div>

            <div className="stat-card">
              <h3>24/7</h3>
              <span>Customer Support</span>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h2 className="footer-logo">YatriQ</h2>
            <p> Discover Nepal with ease. YatriQ helps you plan trips, explore destinations, manage budgets, and create unforgettable travel experiences. </p>
          </div> <div className="footer-section">
            <h2>Contact Us</h2>
            <p>support@yatriq.com</p>
            <p>+977-9860000000</p>
            <p>Kathmandu, Nepal</p>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#"> <i className="fab fa-instagram"></i>
              </a> <a href="#">
                <i className="fab fa-twitter"></i>
              </a> <a href="#">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
        <hr />
        <div className="footer-bottom">
          <p>© 2026 YatriQ. All Rights Reserved.</p>
        </div>
      </footer>

    </div>
  );
}

export default Home;