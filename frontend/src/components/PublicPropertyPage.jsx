import React, { useEffect, useState } from "react";
import { getApprovedReviews } from "../services/api";
import "./PropertyPage.css";
import { FaStar } from "react-icons/fa";

const PropertyPage = () => {
  const [reviews, setReviews] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    getApprovedReviews()
      .then((res) => setReviews(res.data || []))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  const nextReview = () => setCurrent((prev) => (prev + 1) % reviews.length);
  const prevReview = () =>
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);

  if (!reviews.length)
    return (
      <section className="testimonial-section">
        <h2 className="testimonial-title">What Our Guests Say</h2>
        <p className="testimonial-subtitle">
          Hear from the guests who have stayed with us and discover how our
          flexible living solutions make their experiences smooth and enjoyable.
        </p>
        <p className="no-reviews">No approved reviews available yet.</p>
      </section>
    );

  const review = reviews[current];

  return (
    <section className="testimonial-section">
      <h2 className="testimonial-title">What Our Guests Say</h2>
      <p className="testimonial-subtitle">
        Hear from guests who enjoyed our stays and discover how our flexible
        corporate housing solutions simplify relocations and ensure comfort for
        every visitor.
      </p>

      <div className="testimonial-content">
        <h3 className="listing-name">{review.listingName}</h3>

        <div className="stars">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} color="#fbbf24" />
          ))}
        </div>

        <p className="testimonial-text">
          <em>“{review.publicReview}”</em>
        </p>

        <p className="testimonial-author">{review.guestName}</p>

        <p className="testimonial-role">
          {review.guestRole || "Verified Guest"}
        </p>

        <div className="testimonial-nav">
          <button onClick={prevReview}>&lt;</button>
          <button onClick={nextReview}>&gt;</button>
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
