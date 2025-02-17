import Footer from "../../components/Footer/Footer";
import LoginModal from "../../components/Modals/LoginModal/LoginModal";
import SignUpModal from "../../components/Modals/SignUpModal/SignUpModal";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex justify-between items-center bg-[#001529] h-28 px-24">
        <div className="flex justify-center items-center">
          <span>
            <img
              src="/Assets/Images/C10.png"
              alt="logo"
              className="w-20 h-20"
            />{" "}
          </span>
          <h1 className="text-white font-bold text-3xl ml-4">A&A Autos</h1>
        </div>
        <div className="flex flex-wrap">
          <LoginModal />
          <SignUpModal />
        </div>
      </div>
      <div className="flex bg-[url('/Assets/Images/C1.jpg')] bg-cover bg-center w-full h-screen">
        <div className="bg-gradient-to-r from-[#252379] to-[#C92228] text-white h-[70%] flex flex-col justify-center items-center px-6 w-[30%] rounded-lg ml-32 mt-36">
          <h1 className="text-5xl md:text-3xl lg:text-4xl font-bold mb-6 text-center leading-tight">
            <span className="block text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
              A&A Auto's
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
              "Book, Track, Ride – Bike Service Simplified!"
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-center max-w-3xl mb-12 text-gray-100 font-light leading-relaxed">
            Experience the future of bike maintenance with our{" "}
            <span className="font-semibold">
              Bike Service & Spare Parts Management System
            </span>
            . From effortless bookings and real-time tracking to secure payments
            and doorstep pickup – we bring{" "}
            <span className="font-semibold">
              quality, transparency, and convenience
            </span>{" "}
            to every ride. Your bike deserves the best, and we’re here to
            deliver it!
          </p>
          <button className="bg-white text-[#C92228] hover:bg-[#252379] mb-4 hover:text-white font-semibold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl active:scale-95">
            Get Started Now
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
