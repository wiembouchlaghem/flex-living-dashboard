import { useEffect, useState, useRef, useCallback } from "react";
import { getHostawayReviews, approveReview } from "../../services/api";
import ReviewTable from "./ReviewTable";
import Filters from "./Filters";
import { FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./dashboard.css";

const Dashboard = () => {
  const [reviews, setReviews] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    getHostawayReviews()
      .then((res) => {
        setReviews(res.data);
        setFiltered(res.data);
      })
      .catch((err) => console.error("Error fetching reviews:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleApprove = async (id) => {
    await approveReview(id);
    setFiltered((prev) =>
      prev.map((r) => (r._id === id ? { ...r, approved: true } : r))
    );
  };

  const calculatePropertyStats = () => {
    const grouped = reviews.reduce((acc, r) => {
      if (!acc[r.listingName]) acc[r.listingName] = [];
      acc[r.listingName].push(r);
      return acc;
    }, {});

    return Object.entries(grouped).map(([listing, list]) => {
      const avg =
        list.reduce((sum, r) => sum + (r.rating || 0), 0) / list.length;
      const approved = list.filter((r) => r.approved).length;
      return { listing, avg: avg.toFixed(1), total: list.length, approved };
    });
  };

  const stats = calculatePropertyStats();
  const itemsPerPage = 4;
  const totalPages = Math.ceil(stats.length / itemsPerPage);
  const visibleStats = stats.slice(
    pageIndex * itemsPerPage,
    (pageIndex + 1) * itemsPerPage
  );

  const scrollLeft = useCallback(() => {
    setPageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const scrollRight = useCallback(() => {
    setPageIndex((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  }, [totalPages]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let startX = 0;
    let endX = 0;

    const onTouchStart = (e) => {
      startX = e.touches[0].clientX;
    };

    const onTouchEnd = (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (diff > 50) scrollRight();
      else if (diff < -50) scrollLeft();
    };

    el.addEventListener("touchstart", onTouchStart);
    el.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [scrollLeft, scrollRight]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Flex Living Reviews Dashboard</h1>
        <p>Manage, filter, and approve guest reviews by property</p>
      </header>

      <section className="dashboard-summary-wrapper">
        <button
          className="dashboard-scroll-btn left"
          onClick={scrollLeft}
          disabled={pageIndex === 0}
        >
          <FaArrowLeft />
        </button>

        <div className="dashboard-summary" ref={scrollRef}>
          {visibleStats.map((s) => (
            <div key={s.listing} className="summary-card">
              <h3>{s.listing}</h3>
              <p className="rating">
                <FaStar color="#fbbf24" size={14} /> {s.avg}/10
              </p>
              <p>
                {s.approved}/{s.total} approved
              </p>
            </div>
          ))}
        </div>

        <button
          className="dashboard-scroll-btn right"
          onClick={scrollRight}
          disabled={pageIndex === totalPages - 1}
        >
          <FaArrowRight />
        </button>
      </section>

      <Filters reviews={reviews} setFiltered={setFiltered} />

      {loading ? (
        <div className="loading">Loading reviews...</div>
      ) : filtered.length > 0 ? (
        <ReviewTable reviews={filtered} onApprove={handleApprove} />
      ) : (
        <div className="no-results">No reviews match your filters.</div>
      )}
    </div>
  );
};

export default Dashboard;
