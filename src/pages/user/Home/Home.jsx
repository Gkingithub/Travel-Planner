import {React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    } else {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to access the dashboard.",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    loadPopularDestinations();
  }, []);

  const loadPopularDestinations = async () => {

    try {

      const response = await getRandomDestinations();

      if (response.success) {
        setDestinations(response.data);
      }

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div className="home">
      {/* Navigation */}

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

          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>

          <Link to="/register">
            <button className="register-btn">Register</button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}

      <div className="banner">
        <section className="hero" id="home">
          <div className="hero-content">
            <h1>
              Plan With us
              <br />
              Travel Better
            </h1>

            <p>
              Create personalized travel itineraries. Discover destinations,
              estimate your budget, and organize your journey.
            </p>

            <div className="hero-buttons">
              <Link to="/register">
                <button className="primary-btn">
                  <h3>Get Started</h3>
                </button>
              </Link>

              <Link to="/login">
                <button className="secondary-btn">Login</button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Popular Destinations */}

      <section className="destination-section" id="destinations">
        <h1>Popular Destinations</h1>

        <div className="destination-grid">
          <div className="destination-card">
            <img src="/pokhara.jpg" alt="Pokhara" />

            <h3>Pokhara</h3>

            <p>Lakes, mountains and adventure.</p>

            <span>Estimated Budget</span>

            <h4>Rs. 12,000</h4>
          </div>

          <div className="destination-card">
            <img src="/chitwan.jpg" alt="Chitwan" />

            <h3>Chitwan</h3>

            <p>Wildlife and jungle safari.</p>

            <span>Estimated Budget</span>

            <h4>Rs. 15,000</h4>
          </div>

          <div className="destination-card">
            <img src="/mustang.jpg" alt="Mustang" />

            <h3>Mustang</h3>

            <p>Beautiful Himalayan landscapes.</p>

            <span>Estimated Budget</span>

            <h4>Rs. 25,000</h4>
          </div>

          <div className="destination-card">
            <img src="/lumbini.jpg" alt="Lumbini" />

            <h3>Lumbini</h3>

            <p>Birthplace of Lord Buddha.</p>

            <span>Estimated Budget</span>

            <h4>Rs. 10,000</h4>
          </div>
        </div>
      </section>

      {/* Statistics */}

      <section className="statistics">
        <div className="container">
          <div className="statistics-heading">
            <h3>Trusted Across Nepal</h3>

            <p>
              Helping travelers discover destinations, plan memorable journeys,
              and explore Nepal with confidence.
            </p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <h3>120+</h3>
              <span>Destinations</span>
            </div>

            <div className="stat-card">
              <h3>350+</h3>
              <span>Travel Plans</span>
            </div>

            <div className="stat-card">
              <h3>7</h3>
              <span>Activities</span>
            </div>

            <div className="stat-card">
              <h3>24/7</h3>
              <span>Customer Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h2 className="footer-logo">YatriQ</h2>

            <p>
              Discover Nepal with ease. YatriQ helps you plan trips, explore
              destinations, manage budgets, and create unforgettable travel
              experiences.
            </p>
          </div>

          <div className="footer-section">
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

              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>

              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>

              <a href="#">
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