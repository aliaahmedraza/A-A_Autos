import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userState, clearUserState } from "../../Redux/Slicers/userSlice";

const LoginPage = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const expiryTime = decodedToken.exp * 1000;
        const currentTime = Date.now();

        if (currentTime > expiryTime) {
          console.warn("Token expired, logging out...");
          Cookies.remove("token");
          dispatch(clearUserState());
          navigate("/");
        } else {
          dispatch(userState(decodedToken)); // ✅ Persist login state on refresh
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // ✅ Set token for API requests
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error decoding the token:", error);
        Cookies.remove("token");
        dispatch(clearUserState());
      }
    }
  }, [dispatch, navigate]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        "http://localhost:3003/login",
        {
          email: values.email,
          password: values.password,
        },
        { withCredentials: true }
      );

      const token = response.data.token;
      Cookies.set("token", token, { expires: 1 }); // ✅ Store token for 1 day
      const decodedToken = jwtDecode(token);
      dispatch(userState(decodedToken));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; 

      setShowSuccessMessage(true);
      resetForm();

      if (typeof onLoginSuccess === "function") {
        onLoginSuccess();
      }

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Error during Login. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-[70%] flex items-center justify-center p-4 relative mt-8">
      <div className="p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to Your Account
        </h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className={`w-full p-2 border rounded-md ${
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter your email"
                  autoComplete="email"
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 mb-2">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  className={`w-full p-2 border rounded-md ${
                    errors.password && touched.password
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </div>
                )}
              </div>

              <div className="mb-4 text-right">
                <a
                  href="/forgot"
                  className="text-blue-500 text-sm hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Logging In..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>

        {showSuccessMessage && (
          <div className="toast toast-top toast-center bg-green-500 text-white p-4 rounded-md">
            <div className="alert alert-success">
              <span>Login successful! Redirecting to the dashboard...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
