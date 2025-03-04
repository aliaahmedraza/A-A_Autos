import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "antd";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "../CreateSpareParts/CreateSpareParts";

const BasicServiceSchema = Yup.object().shape({
  name: Yup.string().required("Service name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .positive("Price must be greater than zero")
    .required("Price is required"),
});

const BasicServiceForm = () => {
  const [resetTrigger, setResetTrigger] = useState(false);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.post(
        "http://localhost:3003/service-package",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      alert(response.data.message || "Basic Service added successfully");
      resetForm();
      setResetTrigger((prev) => !prev);
    } catch (error) {
      console.error(error.message);
      alert("Failed to create Basic Service");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="create-spare-parts-container">
      <h2>Create Service Package</h2>
      <Formik
        initialValues={{
          name: "",
          description:
            "",
          price: "",
        }}
        validationSchema={BasicServiceSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="spare-parts-form">
            <div className="form-group">
              <label htmlFor="name">Service Name:</label>
              <Field type="text" name="name" className="input text-black" />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <Field
                type="text"
                name="description"
                className="input text-black"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <Field type="number" name="price" className="input text-black" />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex justify-center m-4">
              <Button
                disabled={isSubmitting}
                type="primary"
                htmlType="submit"
                className="submit-button"
              >
                {isSubmitting ? "Submitting..." : "Add Basic Service"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BasicServiceForm;
