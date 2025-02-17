// import { useEffect, useState } from "react";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";

// const ProfileSchema = Yup.object().shape({
//   username: Yup.string().required("Username is required"),
//   email: Yup.string()
//     .email("Invalid email address")
//     .required("Email is required"),
//   address: Yup.string().required("Address is required"),
//   contactNumber: Yup.string()
//     .matches(/^\d{11}$/, "Contact number must be exactly 11 digits")
//     .required("Contact number is required"),
//   cnic: Yup.string()
//     .matches(/^\d{5}-\d{7}-\d$/, "Invalid CNIC format (e.g., 12345-1234567-1)")
//     .required("CNIC is required"),
//   role: Yup.string().required("Role is required"),
// });

// const UpdateProfile = () => {
//   const [initialValues, setInitialValues] = useState({
//     username: "",
//     email: "",
//     address: "",
//     contactNumber: "",
//     cnic: "",
//     role: "",
//   });

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = Cookies.get("token");
//         if (!token) {
//           console.error("No authentication token found.");
//           return;
//         }

//         const decodedToken = jwtDecode(token);
//         const userId = decodedToken.id;

//         const response = await axios.get(
//           `http://localhost:3003/user/${userId}`
//         );

//         if (response.data.success) {
//           setInitialValues({
//             username: response.data.data.username || "",
//             email: response.data.data.email || "",
//             address: response.data.data.address || "",
//             contactNumber: response.data.data.contactNumber || "",
//             cnic: response.data.data.cnic || "",
//             role: response.data.data.role || "",
//           });
//         } else {
//           console.error("Failed to fetch user:", response.data.message);
//         }
//       } catch (error) {
//         console.error("Failed to fetch user data:", error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       const token = Cookies.get("token");
//       if (!token) {
//         alert("Authentication required.");
//         return;
//       }

//       const decodedToken = jwtDecode(token);
//       const userId = decodedToken.id;

//       await axios.put(`http://localhost:3003/user/${userId}`, values);

//       alert("Profile updated successfully!");
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       alert("Failed to update profile. Please try again later.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-6">Update Profile</h2>
//         <Formik
//           initialValues={initialValues}
//           validationSchema={ProfileSchema}
//           onSubmit={handleSubmit}
//           enableReinitialize
//         >
//           {({ errors, touched, isSubmitting }) => (
//             <Form>
//               {[
//                 { name: "username", type: "text", label: "Username" },
//                 { name: "email", type: "email", label: "Email" },
//                 { name: "address", type: "text", label: "Address" },
//                 {
//                   name: "contactNumber",
//                   type: "text",
//                   label: "Contact Number",
//                 },
//                 { name: "cnic", type: "text", label: "CNIC" },
//               ].map((field, index) => (
//                 <div key={index} className="mb-4">
//                   <label
//                     htmlFor={field.name}
//                     className="block text-gray-700 mb-2"
//                   >
//                     {field.label}
//                   </label>
//                   <Field
//                     type={field.type}
//                     name={field.name}
//                     className={`w-full p-2 border rounded-md ${
//                       errors[field.name] && touched[field.name]
//                         ? "border-red-500"
//                         : "border-gray-300"
//                     }`}
//                     placeholder={`Enter your ${field.label}`}
//                   />
//                   {errors[field.name] && touched[field.name] && (
//                     <div className="text-red-500 text-sm mt-1">
//                       {errors[field.name]}
//                     </div>
//                   )}
//                 </div>
//               ))}

//               <div className="mb-4">
//                 <label htmlFor="role" className="block text-gray-700 mb-2">
//                   Role
//                 </label>
//                 <Field
//                   as="select"
//                   name="role"
//                   className={`w-full p-2 border rounded-md ${
//                     errors.role && touched.role
//                       ? "border-red-500"
//                       : "border-gray-300"
//                   }`}
//                 >
//                   <option value="" label="Select your Role" />
//                   <option value="user" label="User" />
//                   <option value="admin" label="Admin" />
//                 </Field>
//                 {errors.role && touched.role && (
//                   <div className="text-red-500 text-sm mt-1">{errors.role}</div>
//                 )}
//               </div>

//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isSubmitting ? "Updating..." : "Update Profile"}
//               </button>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default UpdateProfile;
import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const ProfileSchema = Yup.object().shape({
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
  password: Yup.string(), // Optional password field
  role: Yup.string().required("Role is required"),
});

const UpdateProfile = () => {
  const [initialValues, setInitialValues] = useState({
    username: "",
    email: "",
    address: "",
    contactNumber: "",
    cnic: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          console.error("No authentication token found.");
          return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        const response = await axios.get(
          `http://localhost:3003/user/${userId}`
        );

        if (response.data.success) {
          setInitialValues({
            username: response.data.data.username || "",
            email: response.data.data.email || "",
            address: response.data.data.address || "",
            contactNumber: response.data.data.contactNumber || "",
            cnic: response.data.data.cnic || "",
            password: "", // Keep password empty for security reasons
            role: response.data.data.role || "",
          });
        } else {
          console.error("Failed to fetch user:", response.data.message);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        alert("Authentication required.");
        return;
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      await axios.put(`http://localhost:3003/user/${userId}`, values);

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Update Profile</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={ProfileSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              {[
                { name: "username", type: "text", label: "Username" },
                { name: "email", type: "email", label: "Email" },
                { name: "address", type: "text", label: "Address" },
                {
                  name: "contactNumber",
                  type: "text",
                  label: "Contact Number",
                },
                { name: "cnic", type: "text", label: "CNIC" },
                { name: "password", type: "password", label: "New Password" },
              ].map((field, index) => (
                <div key={index} className="mb-4">
                  <label
                    htmlFor={field.name}
                    className="block text-gray-700 mb-2"
                  >
                    {field.label}
                  </label>
                  <Field
                    type={field.type}
                    name={field.name}
                    className={`w-full p-2 border rounded-md ${
                      errors[field.name] && touched[field.name]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder={`Enter your ${field.label}`}
                    autoComplete={
                      field.name === "password" ? "current-password" : "off"
                    }
                  />
                  {errors[field.name] && touched[field.name] && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors[field.name]}
                    </div>
                  )}
                </div>
              ))}

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
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Updating..." : "Update Profile"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateProfile;

