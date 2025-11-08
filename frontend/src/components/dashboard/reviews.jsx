import { useEffect, useState } from "react";
import { getHostawayReviews } from "../../services/api";
import "./reviews.css"; // ton CSS pour les cards

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getHostawayReviews()
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  return (
    <div className="reviews-container">
      {reviews.map((r, index) => (
        <div key={index} className="review-card">
          <div className="review-name">{r.guestName}</div>
          <div className="review-rating">{r.rating}/10</div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
