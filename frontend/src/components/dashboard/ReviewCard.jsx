import "./ReviewCard.css";
import { FaStar } from "react-icons/fa";

const ReviewCard = ({ review }) => (
  <div className="review-card">
    <div className="review-header">
      <h4>{review.guestName}</h4>
      <span>{new Date(review.submittedAt).toLocaleDateString()}</span>
    </div>
    <p className="review-text">“{review.publicReview}”</p>
    <div className="review-rating">
      <FaStar color="#fbbf24" size={14} /> {review.rating.toFixed(1)} / 10
    </div>
  </div>
);

export default ReviewCard;
