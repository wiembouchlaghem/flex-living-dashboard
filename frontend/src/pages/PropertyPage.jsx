import React, { useEffect, useState } from "react";
import { getApprovedReviews } from "../services/api";
import "./propertypage.css";
import { FaStar, FaRegStar } from "react-icons/fa";

const PropertyPage = () => {
  const [reviews, setReviews] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    getApprovedReviews()
      .then((res) => setReviews(res.data || []))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  const nextReview = () =>
    setCurrent((prev) => (prev + 1) % reviews.length);
  const prevReview = () =>
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);

  if (!reviews.length)
    return (
      <section className="testimonial-section">
        <h2 className="testimonial-title">Our Guests’ Experiences</h2>
        <p className="testimonial-subtitle">
          Discover what our guests have to say about their stays with Flex Living.
        </p>
        <p className="no-reviews">No approved reviews yet.</p>
      </section>
    );

  const review = reviews[current];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} color="#fbbf24" />
        ))}
        {halfStar && <FaStar key="half" color="#fbbf24" style={{ opacity: 0.5 }} />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} color="#fbbf24" />
        ))}
      </>
    );
  };

  return (
    <section className="testimonial-section">
      <h2 className="testimonial-title">Our Guests’ Experiences</h2>
      <p className="testimonial-subtitle">
        Hear real feedback from our guests and see why Flex Living is the perfect choice for flexible stays.
      </p>

      <div className="testimonial-content">
        <h3 className="listing-name">{review.listingName}</h3>

        <div className="stars">{renderStars(review.rating || 0)}</div>

        <p className="testimonial-text">
          <em>“{review.publicReview}”</em>
        </p>

        <p className="testimonial-author">{review.guestName}</p>
        <p className="testimonial-role">
          {review.guestRole || "Verified Guest"} —{" "}
          {new Date(review.submittedAt).toLocaleDateString()}
        </p>

        <div className="testimonial-nav">
          <button className="nav-btn" onClick={prevReview}>
            ← Previous
          </button>
          <button className="nav-btn" onClick={nextReview}>
            Next →
          </button>
        </div>
      </div>

      <div className="testimonial-dots">
        {reviews.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === current ? "active" : ""}`}
            onClick={() => setCurrent(i)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default PropertyPage;
