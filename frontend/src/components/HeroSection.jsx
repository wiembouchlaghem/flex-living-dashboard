import React, { useState } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaUser } from "react-icons/fa";
import "./HeroSection.css";

const HeroSection = () => {
  const [guests, setGuests] = useState(1);

  const incrementGuests = () => setGuests((g) => g + 1);
  const decrementGuests = () => setGuests((g) => (g > 1 ? g - 1 : 1));

  return (
    <section
      className="hero-section"
      style={{
        background: 'url("/Hero_Desktop_Large.webp") center/cover no-repeat',
      }}
    >
      <div className="hero-overlay">
        <h1 className="hero-title">
          Book <br /> Beautiful Stays
        </h1>

        {/* === Search Bar === */}
        <div className="search-bar">
          {/* Location */}
          <div className="search-item">
            <FaMapMarkerAlt className="icon" />
            <span>City</span>
          </div>

          <div className="divider" />

          {/* Dates */}
          <div className="search-item">
            <FaCalendarAlt className="icon" />
            <span>Dates</span>
          </div>

          <div className="divider" />

          {/* Guests */}
          <div className="search-item guests">
            <FaUser className="icon" />
            <button onClick={decrementGuests}>-</button>
            <span>{guests} Guest{guests > 1 ? "s" : ""}</span>
            <button onClick={incrementGuests}>+</button>
          </div>

          {/* Search Button */}
          <button className="search-btn">Search</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
