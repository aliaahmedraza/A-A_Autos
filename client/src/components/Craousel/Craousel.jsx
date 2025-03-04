// import { useEffect, useState } from "react";
// import "./Craousel.css";
// import img1 from "/Assets/Images/C1.jpg";
// import img2 from "/Assets/Images/C3.jpg";
// import img3 from "/Assets/Images/C5.jpg";
// const Craousel = () => {
//   const [slider, setSlider] = useState(0);
//   const data = [img1, img2, img3];
//   const handlePlus = () => {
//     setSlider(slider === data.length - 1 ? 0 : slider + 1);
//   };
//   const handleMinus = () => {
//     setSlider(slider === 0 ? data.length - 1 : slider - 1);
//   };
//   useEffect(() => {
//     const sliderInterval = setInterval(() => {
//       handlePlus();
//     }, 2000);
//     return () => clearInterval(sliderInterval);
//   }, [slider]);
//   return (
//     <div className="slider">
//       {data.map((img, i) => (
//         <div
//           key={i}
//           className={`"slider-img" ${slider === i ? "block" : "hidden"}`}
//         >
//           <img
//             src={img}
//             alt={`Slide ${i}`}
//             style={{ width: "100%", height: "80vh" }}
//           ></img>
//           <div className="btn">
//             <button onClick={handleMinus} className="mr-4">
//               -
//             </button>
//             <button onClick={handlePlus} className="ml-8">
//               +
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Craousel;
// import { useEffect, useState } from "react";
// import "./Craousel.css";
// import img1 from "/Assets/Images/C1.jpg";
// import img2 from "/Assets/Images/C3.jpg";
// import img3 from "/Assets/Images/C5.jpg";

// const Craousel = () => {
//   const [slider, setSlider] = useState(0);
//   const data = [img1, img2, img3];

//   const handleNext = () => {
//     setSlider((prev) => (prev + 1) % data.length);
//   };

//   const handlePrev = () => {
//     setSlider((prev) => (prev - 1 + data.length) % data.length);
//   };

//   useEffect(() => {
//     const sliderInterval = setInterval(handleNext, 3000);
//     return () => clearInterval(sliderInterval);
//   }, []);

//   return (
//     <div className="slider-container">
//       <div className="slider">
//         {data.map((img, i) => (
//           <div key={i} className={`slider-img ${slider === i ? "active" : ""}`}>
//             <img src={img} alt={`Slide ${i}`} />
//           </div>
//         ))}
//       </div>

//       <button onClick={handlePrev} className="prev-btn">
//         ❮
//       </button>
//       <button onClick={handleNext} className="next-btn">
//         ❯
//       </button>

//       <div className="dots">
//         {data.map((_, i) => (
//           <span
//             key={i}
//             className={`dot ${slider === i ? "active" : ""}`}
//             onClick={() => setSlider(i)}
//           ></span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Craousel;
