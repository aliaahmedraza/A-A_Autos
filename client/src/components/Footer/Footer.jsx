// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
// import "../Footer/Footer.css";
// const Footer = () => {
//   return (
//     <div>
//       <div className="relative flex justify-center items-center bg-[#c5252c] h-48 text-white footer">
//         <div>
//           <ul className="flex space-x-8 z-[1]">
//             <li>
//               <a href="/dashboard" className="hover:underline">
//                 Home
//               </a>
//             </li>
//             <li>
//               <a href="/about" className="hover:underline">
//                 About
//               </a>
//             </li>
//             <li>
//               <a href="/contact" className="hover:underline">
//                 Contact Us
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div className="flex justify-center space-x-6">
//           <a
//             href="https://facebook.com"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <FaFacebook className="text-white text-3xl hover:text-gray-200 transition-transform transform hover:scale-110" />
//           </a>
//           <a
//             href="https://twitter.com"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <FaTwitter className="text-white text-3xl hover:text-gray-200 transition-transform transform hover:scale-110" />
//           </a>
//           <a
//             href="https://instagram.com"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <FaInstagram className="text-white text-3xl hover:text-gray-200 transition-transform transform hover:scale-110" />
//           </a>
//           <a
//             href="https://linkedin.com"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <FaLinkedin className="text-white text-3xl hover:text-gray-200 transition-transform transform hover:scale-110" />
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Footer;
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
// import "../Footer/Footer.css";

// const Footer = () => {
//   return (
//     <div className="footer relative flex items-center h-48 text-white px-10">
//       {/* Left Side - Navigation Links */}
//       <ul className="flex space-x-8 z-[1]">
//         <li>
//           <a href="/dashboard" className="hover:underline">
//             Home
//           </a>
//         </li>
//         <li>
//           <a href="/about" className="hover:underline">
//             About
//           </a>
//         </li>
//         <li>
//           <a href="/contact" className="hover:underline">
//             Contact Us
//           </a>
//         </li>
//       </ul>

//       {/* Center - Social Media Icons */}
//       <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-6 z-[1]">
//         <a
//           href="https://facebook.com"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <FaFacebook className="text-white text-3xl hover:text-gray-200 transition-transform transform hover:scale-110" />
//         </a>
//         <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
//           <FaTwitter className="text-white text-3xl hover:text-gray-200 transition-transform transform hover:scale-110" />
//         </a>
//         <a
//           href="https://instagram.com"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <FaInstagram className="text-white text-3xl hover:text-gray-200 transition-transform transform hover:scale-110" />
//         </a>
//         <a
//           href="https://linkedin.com"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <FaLinkedin className="text-white text-3xl hover:text-gray-200 transition-transform transform hover:scale-110" />
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Footer;
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <ul>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">Contact Us</a>
        </li>
        <li>
          <a href="/"></a>
        </li>
      </ul>

      <div className="social-icons">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook className="text-3xl" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-3xl" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="text-3xl" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="text-3xl" />
        </a>
      </div>
    </div>
  );
};

export default Footer;


