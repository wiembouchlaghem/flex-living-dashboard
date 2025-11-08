import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./header.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`flexliving-header ${scrolled ? "scrolled" : ""}`}>
      <div className="flexliving-header-content">
        <div className="flexliving-logo">
          <img src="/Flex Living Logo.webp" alt="FlexLiving Logo" />
        </div>

        <nav className="flexliving-nav">
          <Link to="/">Dashboard</Link>
          <Link to="/properties">Properties</Link>
          <Link to="/reviews">Reviews</Link>
          <Link to="/stats">Statistics</Link>
        </nav>
      </div>
    </header>
  );
}
