import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">

      {/* Navigation */}

      <nav className="navbar">

        <div className="logo">
          <h2>AI Travel Planner</h2>
        </div>

        <div className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <a href="#destinations">Destinations</a>

          <Link to="/login">
            <button className="login-btn">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="register-btn">
              Register
            </button>
          </Link>

        </div>

      </nav>

      {/* Hero Section */}

      <section className="hero" id="home">

        <div className="hero-content">

          <h1>
            Plan With us.
            <br />
            Travel Better.
          </h1>

          <p>
            Create personalized travel itineraries.
            Discover destinations, estimate your budget,
            and organize your journey.
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

      {/* Trip Planner */}

      <section className="planner-section">

        <h2>Quick Trip Planner</h2>

        <p>
          Start planning your next adventure.
        </p>

        <div className="planner-box">

          <input
            type="text"
            placeholder="Destination"
          />

          <input
            type="date"
          />

          <input
            type="date"
          />

          <input
            type="number"
            placeholder="Travelers"
          />

          <button>
            Generate AI Plan
          </button>

        </div>

      </section>

      {/* Popular Destinations */}

      <section
        className="destination-section"
        id="destinations"
      >

        <h2>Popular Destinations</h2>

        <div className="destination-grid">

          <div className="destination-card">

            <img
              src="/pokhara.jpg"
              alt="Pokhara"
            />

            <h3>Pokhara</h3>

            <p>
              Lakes, mountains and adventure.
            </p>

            <span>Estimated Budget</span>

            <h4>Rs. 12,000</h4>

          </div>

          <div className="destination-card">

            <img
              src="/chitwan.jpg"
              alt="Chitwan"
            />

            <h3>Chitwan</h3>

            <p>
              Wildlife and jungle safari.
            </p>

            <span>Estimated Budget</span>

            <h4>Rs. 15,000</h4>

          </div>

          <div className="destination-card">

            <img
              src="/mustang.jpg"
              alt="Mustang"
            />

            <h3>Mustang</h3>

            <p>
              Beautiful Himalayan landscapes.
            </p>

            <span>Estimated Budget</span>

            <h4>Rs. 25,000</h4>

          </div>

          <div className="destination-card">

            <img
              src="/lumbini.jpg"
              alt="Lumbini"
            />

            <h3>Lumbini</h3>

            <p>
              Birthplace of Lord Buddha.
            </p>

            <span>Estimated Budget</span>

            <h4>Rs. 10,000</h4>

          </div>

        </div>

      </section>

      {/* Footer */}

      <footer className="footer">

        <p>
          © 2026 AI Travel Planner. All Rights Reserved.
        </p>

      </footer>

    </div>
  );
}

export default Home;