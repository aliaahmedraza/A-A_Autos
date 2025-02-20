import Footer from "../../components/Footer/Footer";
import LoginModal from "../../components/Modals/LoginModal/LoginModal";
import SignUpModal from "../../components/Modals/SignUpModal/SignUpModal";
import Marquee from "react-fast-marquee";

const LandingPage = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-wrap justify-between items-center bg-[#c5252c] h-28 px-6 md:px-12 lg:px-24">
        <div className="flex items-center">
          <img
            src="/Assets/Images/C10.png"
            alt="logo"
            className="w-16 h-16 md:w-20 md:h-20"
          />
          <h1 className="text-white font-bold text-2xl md:text-3xl ml-4">
            A&A Autos
          </h1>
        </div>
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          <LoginModal />
          <SignUpModal />
        </div>
      </div>

      <div className="bg-[#252379] py-2 h-10">
        <Marquee gradient={false} speed={60}>
          <p className="text-white text-sm md:text-lg font-bold mx-4">
            Welcome to Our Website
          </p>
          <p className="text-white text-sm md:text-lg font-bold mx-4">
            Get the Best Deals Here!
          </p>
          <p className="text-white text-sm md:text-lg font-bold mx-4">
            24/7 Customer Support Available
          </p>
        </Marquee>
      </div>

      <div className="flex-grow flex bg-[url('/Assets/Images/C5.jpg')] bg-cover bg-center w-full min-h-screen relative">
        <div className="bg-gradient-to-r from-[#252379] to-[#C92228] text-white mb-28 p-6 sm:p-8 md:p-10 lg:p-12 rounded-lg w-full sm:w-[90%] md:w-[60%] lg:w-[40%] max-w-lg absolute bottom-8 left-4 sm:bottom-16 sm:left-12 md:bottom-24 md:left-32">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
            <span className="block text-center text-2xl sm:text-3xl font-bold mb-2">
              A&A Auto's
            </span>
            <span className="flex justify-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 text-3xl">
              "Book, Track & Ride" <br /> "Bike Service Simplified!"
            </span>
          </h1>
          <p className="text-2xl sm:text-base text-gray-100 mb-6 leading-relaxed ">
            Experience the future of bike maintenance with our
            <span className="font-semibold">
              {" "}
              Bike Service & Spare Parts Management System{" "}
            </span>
            . From effortless bookings and real-time tracking to secure payments
            and doorstep pickup – we bring
            <span className="font-semibold">
              {" "}
              quality, transparency, and convenience{" "}
            </span>{" "}
            to every ride. Your bike deserves the best, and we’re here to
            deliver it!
          </p>
          <span className="flex justify-center">
            <button
              className="bg-white text-[#C92228] hover:bg-[#252379] hover:text-white font-semibold py-2 px-6 rounded-full transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl active:scale-95"
              onClick={scrollToTop}
            >
              Get Started Now
            </button>
          </span>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
