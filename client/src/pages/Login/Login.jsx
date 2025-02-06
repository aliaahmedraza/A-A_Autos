// import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const Login = () => {
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
  });

  const initialValues = { email: "", password: "" };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-white p-10 rounded-lg shadow-xl w-96">
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            values.target;
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block font-semibold text-gray-700"
                >
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="mt-2 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && touched.email && (
                  <div className="mt-1 text-red-500 text-sm">
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block font-semibold text-gray-700"
                >
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="mt-2 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.password && touched.password && (
                  <div className="mt-1 text-red-500 text-sm">
                    {errors.password}
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mb-6">
                <a href="*" className="text-blue-500 text-sm hover:underline">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
              >
                {isSubmitting ? "Submitting..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
