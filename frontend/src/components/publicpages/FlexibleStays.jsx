import "./FlexibleStays.css";
import { FaClock, FaCalendarAlt, FaBuilding } from "react-icons/fa";

export default function FlexibleStays() {
  const stays = [
    {
      type: "Short-Term",
      icon: <FaClock size={28} />,
      description: "Ideal for quick business trips or temporary visits. Fully furnished, ready-to-move-in apartments.",
      options: ["1-4 weeks", "Fully equipped", "Flexible check-in/out"]
    },
    {
      type: "Medium-Term",
      icon: <FaCalendarAlt size={28} />,
      description: "Perfect for relocations or project-based assignments. Comfort and convenience guaranteed.",
      options: ["1-3 months", "Utilities included", "Personalized support"]
    },
    {
      type: "Long-Term",
      icon: <FaBuilding size={28} />,
      description: "Designed for long-term stays. Enjoy stability, premium amenities, and community perks.",
      options: ["3+ months", "Dedicated account manager", "Flexible extensions"]
    }
  ];

  return (
    <section className="flexible-section">
      <div className="flexible-container">
        <h1 className="flexible-title">Flexible Stays</h1>
        <p className="flexible-subtitle">
          Choose the type of stay that suits your needs and enjoy tailored comfort and services.
        </p>

        <div className="stays-grid">
          {stays.map((stay, index) => (
            <div key={index} className="stay-card">
              <div className="stay-icon">{stay.icon}</div>
              <h3 className="stay-type">{stay.type}</h3>
              <p className="stay-description">{stay.description}</p>
              <ul className="stay-options">
                {stay.options.map((opt, i) => (
                  <li key={i}>{opt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
