import React, { useState } from "react";
import "./ReviewTable.css";
import { FaCheckCircle } from "react-icons/fa";
import { FiThumbsUp } from "react-icons/fi";

export default function ReviewTable({ reviews, onApprove }) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(reviews.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedReviews = reviews.slice(startIndex, startIndex + rowsPerPage);

  const nextPage = () => setCurrentPage((p) => (p < totalPages ? p + 1 : p));
  const prevPage = () => setCurrentPage((p) => (p > 1 ? p - 1 : p));

  return (
    <div className="table-container">
      <table className="reviews-table">
        <thead>
          <tr>
            <th>Listing</th>
            <th>Guest</th>
            <th>Rating</th>
            <th>Date</th>
            <th>Review</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedReviews.map((r, idx) => (
            <tr key={idx} className={r.approved ? "approved-row" : ""}>
              <td>{r.listingName}</td>
              <td>{r.guestName}</td>
              <td>{r.rating ? Number(r.rating).toFixed(2) : "N/A"}</td>
              <td>{new Date(r.submittedAt).toLocaleDateString()}</td>
              <td className="review-text">{r.publicReview}</td>
              <td>
                {r.approved ? (
                  <span className="approved-badge">
                    <FaCheckCircle color="#16a34a" size={16} /> Approved
                  </span>
                ) : (
                  <button
                    className="approve-btn"
                    onClick={() => onApprove?.(r._id)}
                  >
                    <FiThumbsUp size={16} style={{ marginRight: 5 }} />
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          ⬅ Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next ➡
        </button>
      </div>
    </div>
  );
}
