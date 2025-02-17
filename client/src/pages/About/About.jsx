import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";

const About = () => {
    const navigate = useNavigate();
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            About Us
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Revolutionizing Bike Maintenance with Technology and Transparency
          </p>
        </div>

        {/* Mission Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
          <p className="mt-4 text-lg text-gray-600">
            At Bike Service & Spare Parts Management System, we aim to simplify
            bike maintenance by providing a seamless, transparent, and
            hassle-free experience. We combine cutting-edge technology with
            exceptional customer service to ensure your bike gets the care it
            deserves.
          </p>
        </div>

        {/* Features Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900">What We Offer</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900">
                User-Friendly Platform
              </h3>
              <p className="mt-2 text-gray-600">
                Easy registration, secure authentication, and a personalized
                dashboard for all your bike service needs.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900">
                Transparent Service
              </h3>
              <p className="mt-2 text-gray-600">
                Live updates, photo/video proofs, and upfront cost estimates for
                complete transparency.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900">
                Convenient Pickup & Delivery
              </h3>
              <p className="mt-2 text-gray-600">
                Let us handle the logistics with our affordable pickup and
                delivery service.
              </p>
            </div>
          </div>
        </div>

        {/* Commitment Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900">Our Commitment</h2>
          <p className="mt-4 text-lg text-gray-600">
            We are dedicated to providing the best care for your bike. From
            quality spare parts to expert mechanics, we ensure your bike is in
            safe hands. Our post-service support ensures you’re always satisfied
            with our work.
          </p>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Ready to Experience Hassle-Free Bike Maintenance?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Join us today and give your bike the care it deserves.
          </p>
          {/* <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300" onClick={()=>navigate("/login")}>
            Get Started
          </button> */}

          <button
            onClick={() => navigate("/")}
            className="m-8 flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
          >
            Get Started
            <svg
              className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-white text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
              viewBox="0 0 16 19"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                className="fill-gray-800 group-hover:fill-gray-800"
              ></path>
            </svg>
            <div className="absolute inset-0 bg-emerald-500 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full -z-10"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
