import React from "react";
import "./footer.css";
import { FiSend, FiPhone, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="flexliving-footer">
      <div className="footer-container">
        {/* Section newsletter / Join */}
        <div className="footer-column join">
          <h3>Join FlexLiving</h3>
          <p>
            Sign up for updates and exclusive offers, including 5% off your first booking!
          </p>
          <form className="footer-form">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
            <input type="email" placeholder="Email Address" />
            <div className="footer-form-inline">
              <select>
                <option>GB +44</option>
                <option>FR +33</option>
                <option>DZ +213</option>
              </select>
              <input type="tel" placeholder="Phone Number" />
            </div>
            <button type="submit">
              <FiSend size={16} style={{ marginRight: 6 }} />
              Subscribe
            </button>
          </form>
        </div>

        {/* About section */}
        <div className="footer-column">
          <h3>About FlexLiving</h3>
          <p>
            We provide professional property management, flexible rentals for
            businesses, and quality stays for travelers — both short and long term.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li>Blog</li>
            <li>Careers</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Locations */}
        <div className="footer-column">
          <h3>Our Locations</h3>
          <ul>
            <li>London</li>
            <li>Paris</li>
            <li>Algiers</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-column contact">
          <h3>Contact Us</h3>
          <p className="contact-label">
            <FiPhone size={16} style={{ marginRight: 6 }} />
            Support Numbers
          </p>
          <ul>
            <li>United Kingdom — +44 77 2374 5646</li>
            <li>Algeria — +213 7 57 59 22 41</li>
            <li>France — +33 6 44 64 57 17</li>
          </ul>
          <p className="email">
            <FiMail size={16} style={{ marginRight: 6 }} />
            info@flexliving.com
          </p>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="footer-bottom">© 2025 FlexLiving. All rights reserved.</div>
    </footer>
  );
}
