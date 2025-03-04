import SearchBar from "../SearchBar/SearchBar";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";


const Headers = () => {
  const userData = useSelector((state) => state.user.user);
  return (
    <div className="grid grid-cols-[1fr_2fr_1fr] gap-4 items-center bg-[#c5252c] h-28 px-24 ">
      <div className="flex justify-start items-center">
        <span>
          <img src="/Assets/Images/C10.png" alt="logo" className="w-20 h-20" />
        </span>
        <h1 className="text-white font-bold text-3xl ml-4">A&A Autos</h1>
      </div>
      <div>
        <SearchBar />
      </div>
      <div>
        {userData && userData.email ? (
          <div className="flex flex-col items-end justify-center gap-3">
            {/* <img
              src={decodetoken.profilePic || "/Assets/Images/C10.png"}
              alt="Profile"
              className="h-10 w-10 rounded-full object-cover"
            /> */}
            <FaUserCircle className="text-white text-5xl mr-20 pt-2" />
            <span className="font-medium text-white pb-3">{userData.email}</span>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Headers;







// import SearchBar from "../SearchBar/SearchBar";
// import { useSelector } from "react-redux";

// const Headers = () => {
//   const decodetoken = useSelector((state) => state.user.user);

//   // Ensure Redux has updated before displaying the user info
//   if (!decodetoken || !decodetoken.email) {
//     return (
//       <div className="grid grid-cols-[1fr_2fr_1fr] gap-4 items-center bg-[#c5252c] h-28 px-24">
//         <div className="flex justify-start items-center">
//           <span>
//             <img
//               src="/Assets/Images/C10.png"
//               alt="logo"
//               className="w-20 h-20"
//             />
//           </span>
//           <h1 className="text-white font-bold text-3xl ml-4">A&A Autos</h1>
//         </div>
//         <div>
//           <SearchBar />
//         </div>
//         <div className="flex justify-end">
//           <p className="text-white font-medium">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-[1fr_2fr_1fr] gap-4 items-center bg-[#c5252c] h-28 px-24">
//       <div className="flex justify-start items-center">
//         <span>
//           <img src="/Assets/Images/C10.png" alt="logo" className="w-20 h-20" />
//         </span>
//         <h1 className="text-white font-bold text-3xl ml-4">A&A Autos</h1>
//       </div>
//       <div>
//         <SearchBar />
//       </div>
//       <div className="flex items-center gap-3">
//         <img
//           src={decodetoken.profilePic || "/Assets/Images/C10.png"}
//           alt="Profile"
//           className="h-10 w-10 rounded-full object-cover"
//         />
//         <span className="font-medium text-white">{decodetoken.email}</span>
//       </div>
//     </div>
//   );
// };

// export default Headers;

