import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Select } from "antd";
import "./CreateSpareParts.css";
import YearOnlyPicker from "../YearPicker/YearPicker";

const SparePartSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  model: Yup.string().required("Model Year is required"),
  price: Yup.number()
    .positive("Price must be greater than zero")
    .required("Price is required"),
  stockQuantity: Yup.number()
    .min(0, "Stock must be at least 0")
    .required("Stock is required"),
  manufacturer: Yup.string().required("Manufacturer is required"),
  cc: Yup.number().min(50, "CC must be at least 50").required("CC is required"),
  category: Yup.string().required("Category is required"),
});

const CreateSpareParts = () => {
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("Spare part created:", values);
    setTimeout(() => {
      setSubmitting(false);
      resetForm();
    }, 3000);
  };

  return (
    <div className="create-spare-parts-container">
      <h2>Create Spare Part</h2>
      <Formik
        initialValues={{
          name: "",
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
        {({ isSubmitting, setFieldValue }) => (
          <Form className="spare-parts-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <Field type="text" name="name" className="input" />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="form-group">
              <label htmlFor="model">Model Year:</label>
              <YearOnlyPicker name="model" setFieldValue={setFieldValue} />
              <ErrorMessage
                name="model"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <Field type="number" name="price" className="input" />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="form-group">
              <label htmlFor="stockQuantity">Stock Quantity:</label>
              <Field type="number" name="stockQuantity" className="input" />
              <ErrorMessage
                name="stockQuantity"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="form-group">
              <label htmlFor="manufacturer">Manufacturer:</label>
              <Select
                name="manufacturer"
                placeholder="Select Manufacturer"
                onChange={(value) => setFieldValue("manufacturer", value)}
                style={{ width: "100%" }}
              >
                <Select.Option value="Honda">Honda</Select.Option>
                <Select.Option value="United">United</Select.Option>
                <Select.Option value="Metro">Metro</Select.Option>
                <Select.Option value="Yamaha">Yamaha</Select.Option>
                <Select.Option value="Suzuki">Suzuki</Select.Option>
              </Select>
              <ErrorMessage
                name="manufacturer"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="form-group">
              <label htmlFor="cc">CC (Cubic Centimeter):</label>
              <Field type="number" name="cc" className="input" />
              <ErrorMessage
                name="cc"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category:</label>
              <Select
                name="category"
                placeholder="Select Category"
                onChange={(value) => setFieldValue("category", value)}
                style={{ width: "100%" }}
              >
                <Select.Option value="Engine">Engine</Select.Option>
                <Select.Option value="Brakes">Brakes</Select.Option>
                <Select.Option value="Suspension">Suspension</Select.Option>
                <Select.Option value="Body">Body</Select.Option>
                <Select.Option value="Electrical">Electrical</Select.Option>
              </Select>
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex justify-center m-4">
              <Button
                disabled={isSubmitting}
                type="primary"
                htmlType="submit"
                className="submit-button w-32 h-12"
              >
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
