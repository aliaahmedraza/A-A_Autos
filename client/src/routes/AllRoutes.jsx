// import React from "react";
import { Routes, Route} from "react-router-dom";
import Login from "../pages/Login/Login.jsx";
const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>}/>
      </Routes>
    </div>
  );
};

export default AllRoutes;
