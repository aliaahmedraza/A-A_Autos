import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#252379] text-white p-8 h-72">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 ">
        <div className="space-y-4 mr-36">
          <h3 className="text-2xl font-semibold relative pb-2  after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-white">
            About A&A Autos
          </h3>
          <p className="text-sm leading-relaxed">
            Your trusted partner in automotive excellence. We provide premium
            bike services, maintenance, and repairs with unmatched quality and
            customer satisfaction.
          </p>
          <div className="flex space-x-4 mt-4 mb-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl hover:-translate-y-1 transition-transform"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl hover:-translate-y-1 transition-transform"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl hover:-translate-y-1 transition-transform"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl hover:-translate-y-1 transition-transform"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className="space-y-4 ml-10">
          <h3 className="text-2xl font-semibold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-white">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/dashboard" className="hover:pl-1 transition-all">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:pl-1 transition-all">
                About Us
              </a>
            </li>
            <li>
              <a href="/services" className="hover:pl-1 transition-all">
                Services
              </a>
            </li>
            <li>
              <a href="/appointment" className="hover:pl-1 transition-all">
                Book Appointment
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:pl-1 transition-all">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-semibold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-white">
            Contact Info
          </h3>
          <div className="space-y-3 text-sm">
            <p className="flex items-center space-x-2">
              <FaMapMarkerAlt />
              <span>GTS Chowk, Gujrat, Pakistan</span>
            </p>
            <p className="flex items-center space-x-2">
              <FaPhone />
              <span>+92 315 320 9699</span>
            </p>
            <p className="flex items-center space-x-2">
              <FaEnvelope />
              <span>info@aautos.com</span>
            </p>
          </div>
          <div className="mt-4">
            <h4 className="text-lg mb-1">Business Hours</h4>
            <p className="text-sm">Monday - Saturday: 9:00 AM - 7:00 PM</p>
            <p className="text-sm">Sunday: Closed</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

