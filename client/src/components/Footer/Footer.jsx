import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer p-8">
      <div className="footer-content">
        <div className="footer-section mr-20">
          <h3>About A&A Autos</h3>
          <p>
            Your trusted partner in automotive excellence. We provide premium
            bike services, maintenance, and repairs with unmatched quality and
            customer satisfaction.
          </p>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className="footer-section ml-10">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/dashboard">Home</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/services">Services</a>
            </li>
            <li>
              <a href="/appointment">Book Appointment</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Info</h3>
          <div className="contact-info">
            <p>
              <FaMapMarkerAlt />
              <span>GTS Chowk , Gujrat, Pakistan</span>
            </p>
            <p>
              <FaPhone />
              <span>+92 315 320 9699</span>
            </p>
            <p>
              <FaEnvelope />
              <span>info@aautos.com</span>
            </p>
          </div>
          <div className="business-hours">
            <h4>Business Hours</h4>
            <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} A&A Autos. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
