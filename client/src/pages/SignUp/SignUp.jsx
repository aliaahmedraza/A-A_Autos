import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signUpState } from "../../Redux/Slicers/UserSignUpSlice.js";
import PasswordStrengthMeter from "../../components/PasswordStrengthMeter/PasswordStrengthMeter.jsx";

const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  address: Yup.string().required("Address is required"),
  contactNumber: Yup.string()
    .matches(/^\d{11}$/, "Contact number must be exactly 11 digits")
    .required("Contact number is required"),
  cnic: Yup.string()
    .matches(/^\d{5}-\d{7}-\d$/, "Invalid CNIC format (e.g., 12345-1234567-1)")
    .required("CNIC is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
      "Password must include at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),
  role: Yup.string().required("Role is required"),
});

const SignupPage = ({ onSignUpSuccess }) => {
  const dispatch = useDispatch();
  const initialValues = {
    username: "",
    email: "",
    address: "",
    contactNumber: "",
    cnic: "",
    password: "",
    role: "",
  };

  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setFieldError }
  ) => {
    try {
      const response = await axios.post("http://localhost:3003/signup", values);
      alert(response.data.message || "Signup successful!");
      resetForm();
      dispatch(signUpState(response.data.message));
      onSignUpSuccess();
    } catch (error) {
      if (error.response && error.response.data) {
        const backendError = error.response.data;
        if (backendError.errors) {
          backendError.errors.forEach((err) => {
            setFieldError(err.field, err.message);
          });
        } else {
          alert(
            backendError.message || "Error during signup. Please try again."
          );
        }
      } else {
        alert("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className=" h-[70%] flex items-center justify-center p-4 rounded-4xl">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Your Account
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting, values }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 mb-2">
                  Username
                </label>
                <Field
                  type="text"
                  name="username"
                  className={`w-full p-2 border rounded-md ${
                    errors.username && touched.username
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter your Username"
                />
                {errors.username && touched.username && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.username}
                  </div>
                )}
              </div>
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
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700 mb-2">
                  Address
                </label>
                <Field
                  type="text"
                  name="address"
                  className={`w-full p-2 border rounded-md ${
                    errors.address && touched.address
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter your address"
                />
                {errors.address && touched.address && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.address}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="contactNumber"
                  className="block text-gray-700 mb-2"
                >
                  Contact Number
                </label>
                <Field
                  type="text"
                  name="contactNumber"
                  className={`w-full p-2 border rounded-md ${
                    errors.contactNumber && touched.contactNumber
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter your Contact Number"
                />
                {errors.contactNumber && touched.contactNumber && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.contactNumber}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="cnic" className="block text-gray-700 mb-2">
                  CNIC
                </label>
                <Field
                  type="text"
                  name="cnic"
                  className={`w-full p-2 border rounded-md ${
                    errors.cnic && touched.cnic
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter your CNIC Number"
                />
                {errors.cnic && touched.cnic && (
                  <div className="text-red-500 text-sm mt-1">{errors.cnic}</div>
                )}
              </div>
              <div className="mb-4">
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
                />
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm mt-1">{errors.cnic}</div>
                )}
                <PasswordStrengthMeter password={values.password} />
              </div>
              <div className="mb-4">
                <label htmlFor="role" className="block text-gray-700 mb-2">
                  Role
                </label>
                <Field
                  as="select"
                  name="role"
                  className={`w-full p-2 border rounded-md ${
                    errors.role && touched.role
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <option value="" label="Select your Role" />
                  <option value="user" label="User" />
                  <option value="admin" label="Admin" />
                </Field>
                {errors.role && touched.role && (
                  <div className="text-red-500 text-sm mt-1">{errors.role}</div>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white py-2 rounded-md 
                  hover:bg-blue-600 transition duration-300 
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupPage;
