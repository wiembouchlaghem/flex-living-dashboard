import "./BusinessHousing.css";
import { FaSearch, FaCheck, FaHome, FaCouch, FaFileInvoiceDollar, FaUserTie } from "react-icons/fa";

export default function BusinessHousing() {
  const steps = [
    { title: "Tell Us Your Needs", icon: <FaSearch size={28} />, description: "Share your requirements and preferences — we listen carefully to match the perfect accommodation." },
    { title: "Get Matched", icon: <FaCheck size={28} />, description: "Our team finds the best options for you, tailored to your timeline, budget, and team size." },
    { title: "Move In & Relax", icon: <FaHome size={28} />, description: "Move into a fully prepared apartment and enjoy a seamless, comfortable experience." }
  ];

  const services = [
    { title: "Furnished Apartments", icon: <FaCouch size={28} />, description: "Fully equipped, stylish apartments ready to move in." },
    { title: "Corporate Billing", icon: <FaFileInvoiceDollar size={28} />, description: "Streamlined billing and invoicing for your company." },
    { title: "Dedicated Account Manager", icon: <FaUserTie size={28} />, description: "One point of contact to handle everything for a smooth stay." }
  ];

  return (
    <section className="business-section">
      <div className="business-container">
        <h1 className="business-title">Smart Corporate Housing</h1>
        <p className="business-description">
          Flex partners with <strong>150+ global companies</strong> to deliver turnkey corporate accommodations. Our fully equipped apartments offer comfort and productivity — ideal for relocations, long business trips, or temporary project stays.
        </p>

        {/* How It Works */}
        <h2 className="section-subtitle">How It Works</h2>
        <div className="business-cards">
          {steps.map((step, i) => (
            <div key={i} className="business-card">
              <div className="icon-circle">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>

        {/* Our Services */}
        <h2 className="section-subtitle">Our Services</h2>
        <div className="business-cards">
          {services.map((service, i) => (
            <div key={i} className="business-card">
              <div className="icon-circle">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
