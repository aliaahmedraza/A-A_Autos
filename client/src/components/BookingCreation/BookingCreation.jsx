import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "antd";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "../CreateSpareParts/CreateSpareParts";

const BasicServiceSchema = Yup.object().shape({
  user: Yup.string().required("User is required"),
  bike: Yup.string().required("Bike is required"),
  servicePackage: Yup.string().required("Service package is required"),
  additionalServices: Yup.array().of(Yup.string()),
  sparePartsUsed: Yup.array().of(
    Yup.object().shape({
      sparePart: Yup.string().required("Spare part is required"),
      quantity: Yup.number()
        .min(1, "Quantity must be at least 1")
        .required("Quantity is required"),
    })
  ),
  pickupType: Yup.string().oneOf(["self", "delivery"], "Invalid pickup type"),
  deliveryAddress: Yup.string().when("pickupType", {
    is: "delivery",
    then: Yup.string().required("Delivery address is required"),
  }),
  deliveryDistance: Yup.number().min(0, "Distance must be non-negative"),
  deliveryCharges: Yup.number().min(0, "Charges must be non-negative"),
  totalCost: Yup.number()
    .min(0, "Total cost must be non-negative")
    .required("Total cost is required"),
  serviceSlot: Yup.string().required("Service slot is required"),
});

const Booking = () => {
  const [resetTrigger, setResetTrigger] = useState(false);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.post(
        "http://localhost:3003/booking",
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
      <h2>Book Basic Service</h2>
      <Formik
        initialValues={{
          user: "",
          bike: "",
          servicePackage: "",
          additionalServices: [],
          sparePartsUsed: [],
          pickupType: "self",
          deliveryAddress: "",
          deliveryDistance: 0,
          deliveryCharges: 0,
          totalCost: 0,
          serviceSlot: "",
        }}
        validationSchema={BasicServiceSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form className="spare-parts-form">
            <div className="form-group">
              <label htmlFor="user">User:</label>
              <Field type="text" name="user" className="input text-black" />
              <ErrorMessage
                name="user"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="form-group">
              <label htmlFor="bike">Bike:</label>
              <Field type="text" name="bike" className="input text-black" />
              <ErrorMessage
                name="bike"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="form-group">
              <label htmlFor="servicePackage">Service Package:</label>
              <Field
                type="text"
                name="servicePackage"
                className="input text-black"
              />
              <ErrorMessage
                name="servicePackage"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="form-group">
              <label htmlFor="serviceSlot">Service Slot:</label>
              <Field
                type="text"
                name="serviceSlot"
                className="input text-black"
              />
              <ErrorMessage
                name="serviceSlot"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="form-group">
              <label>Pickup Type:</label>
              <Field as="select" name="pickupType" className="input text-black">
                <option value="self">Self</option>
                <option value="delivery">Delivery</option>
              </Field>
            </div>

            {values.pickupType === "delivery" && (
              <div className="form-group">
                <label htmlFor="deliveryAddress">Delivery Address:</label>
                <Field
                  type="text"
                  name="deliveryAddress"
                  className="input text-black"
                />
                <ErrorMessage
                  name="deliveryAddress"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="totalCost">Total Cost:</label>
              <Field
                type="number"
                name="totalCost"
                className="input text-black"
              />
              <ErrorMessage
                name="totalCost"
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
                {isSubmitting ? "Submitting..." : "Book Service"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Booking;
