import { useEffect, useState } from "react";
import { getHostawayStats } from "../../services/api";
import { FaStar } from "react-icons/fa";
import "./stats.css";

const Stats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHostawayStats()
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Error fetching stats:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading stats...</div>;
  if (stats.length === 0) return <div>No stats available.</div>;

  return (
    <div className="stats-container">
      <h2>Hostaway Property Stats</h2>
      <div className="stats-grid">
        {stats.map((s) => (
          <div key={s._id} className="stats-card">
            <h3>{s._id}</h3>
            <p className="rating">
              <FaStar color="#fbbf24" /> {s.avgRating.toFixed(1)}/10
            </p>
            <p>Total Reviews: {s.totalReviews}</p>
            <p>Approved Reviews: {s.approvedReviews}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
