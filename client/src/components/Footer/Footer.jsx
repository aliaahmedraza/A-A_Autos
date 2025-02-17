import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
// import Marquee from "react-fast-marquee";
const Footer = () => {
  return (
    <div>
      {/* <div className="bg-[#252379] py-4 border-b-2">
        <Marquee gradient={false} speed={60}>
          <p className="text-white text-lg font-bold mx-4">
            Welcome to Our Website
          </p>
          <p className="text-white text-lg font-bold mx-4">
            Get the Best Deals Here!
          </p>
          <p className="text-white text-lg font-bold mx-4">
            24/7 Customer Support Available
          </p>
        </Marquee>
      </div> */}
      <div className="flex justify-center items-center bg-[#252379] h-28">
        <div className="flex justify-center space-x-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="text-white text-3xl hover:text-gray-200 transition-transform transform hover:scale-110" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="text-white text-3xl hover:text-gray-200 transition-transform transform hover:scale-110" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-white text-3xl hover:text-gray-200 transition-transform transform hover:scale-110" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-white text-3xl hover:text-gray-200 transition-transform transform hover:scale-110" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
