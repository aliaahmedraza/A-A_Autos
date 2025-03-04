import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Select } from "antd";
import "./CreateSpareParts.css";
import YearOnlyPicker from "../YearPicker/YearPicker";
import axios from "axios";
import SparePartsPicker from "../SparePartsPicker/SparePartsPicker";
import { useState } from "react";
import Cookies from "js-cookie";

const SparePartSchema = Yup.object().shape({
  name: Yup.object()
    .shape({
      value: Yup.string().required("Spare Part is required"),
      label: Yup.string().required("Spare Part label is required"),
    })
    .nullable()
    .required("Spare Part is required"),
  model: Yup.string().required("Model Year is required"),
  price: Yup.number()
    .positive("Price must be greater than zero")
    .required("Price is required"),
  stockQuantity: Yup.number()
    .min(0, "Stock must be at least 0")
    .required("Stock is required"),
  manufacturer: Yup.string().required("Manufacturer is required"),
  cc: Yup.string().required("CC is required"),
  category: Yup.string().required("Category is required"),
});

const CreateSpareParts = () => {
  const [resetTrigger, setResetTrigger] = useState(false); 

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
const token = Cookies.get("token");
const response = await axios.post(
  "http://localhost:3003/spare-part",
  {
    name: values.name?.value,
    model: values.model,
    price: values.price,
    stockQuantity: values.stockQuantity,
    manufacturer: values.manufacturer,
    cc: values.cc,
    category: values.category,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  }
);
      alert(response.data.message || "Spare Part added successfully");
      resetForm();
      setResetTrigger((prev) => !prev);
    } catch (error) {
      console.error(error.message);
      alert("Failed to create Spare Part");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="create-spare-parts-container">
      <h2>Create Spare Part</h2>
      <Formik
        initialValues={{
          name: null,
          model: "",
          price: "",
          stockQuantity: "",
          manufacturer: "",
          cc: "",
          category: "",
        }}
        validationSchema={SparePartSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="spare-parts-form">
            <div className="form-group">
              <label htmlFor="name">Spare Part:</label>
              <SparePartsPicker
                selectedPart={values.name}
                setSelectedPart={(selected) => setFieldValue("name", selected)}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="form-group">
              <label htmlFor="model">Model Year:</label>
              <YearOnlyPicker
                name="model"
                setFieldValue={setFieldValue}
                resetTrigger={resetTrigger}
              />
              <ErrorMessage
                name="model"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <Field type="" name="price" className="input text-black" />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="form-group">
              <label htmlFor="stockQuantity">Stock Quantity:</label>
              <Field
                type="number"
                name="stockQuantity"
                className="input text-black"
              />
              <ErrorMessage
                name="stockQuantity"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="form-group">
              <label htmlFor="manufacturer">Manufacturer:</label>
              <Select
                value={values.manufacturer || undefined}
                placeholder="Select Manufacturer"
                onChange={(value) => setFieldValue("manufacturer", value)}
                style={{ width: "100%" }}
              >
                {["Honda", "United", "Metro", "Yamaha", "Suzuki"].map(
                  (brand) => (
                    <Select.Option key={brand} value={brand}>
                      {brand}
                    </Select.Option>
                  )
                )}
              </Select>
              <ErrorMessage
                name="manufacturer"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="form-group">
              <label htmlFor="cc">CC (Cubic Centimeter):</label>
              <Select
                value={values.cc || undefined}
                placeholder="Select CC"
                onChange={(value) => setFieldValue("cc", value)}
                style={{ width: "100%" }}
              >
                {["70", "110", "125", "150"].map((ccValue) => (
                  <Select.Option key={ccValue} value={ccValue}>
                    {ccValue}
                  </Select.Option>
                ))}
              </Select>
              <ErrorMessage
                name="cc"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category:</label>
              <Select
                value={values.category || undefined}
                placeholder="Select Category"
                onChange={(value) => setFieldValue("category", value)}
                style={{ width: "100%" }}
              >
                {[
                  "Engine",
                  "Transmission",
                  "Clutch",
                  "Brakes",
                  "Suspension",
                  "Wheels & Tires",
                  "Fuel System",
                  "Exhaust System",
                  "Frame & Body",
                ].map((cat) => (
                  <Select.Option key={cat} value={cat}>
                    {cat}
                  </Select.Option>
                ))}
              </Select>
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex justify-center m-4">
              <Button disabled={isSubmitting} type="primary" htmlType="submit">
                {isSubmitting ? "Submitting..." : "Add Spare Part"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateSpareParts;

