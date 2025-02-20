import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const ProtectedRoutes = ({ children }) => {
    const navigate = useNavigate();
    const isAuthenticated = false;
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/")
        }
    },[isAuthenticated,navigate])
  return (
    <div>
      children
    </div>
  )
}

export default ProtectedRoutes
