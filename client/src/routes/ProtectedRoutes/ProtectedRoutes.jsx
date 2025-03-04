// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";

// const ProtectedRoutes = ({ children }) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = Cookies.get("token");
//     if (!token) {
//       // If there is no token, redirect to the login page.
//       navigate("/");
//     }
//   }, [navigate]);

//   return children;
// };

// export default ProtectedRoutes;
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate("/");
    }
  }, [navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return children;
};

export default ProtectedRoutes;
