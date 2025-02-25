// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import './CreateSpareParts.css';

// const CreateSpareParts = () => {
//   const [formState, setFormState] = useState({
//     name: '',
//     description: '',
//     price: '',
//     stockQuantity: '',
//     manufacturer: '',
//     category: ''
//   });
//   const [loading, setLoading] = useState(false);

//   const validateForm = (data) => {
//     if (parseFloat(data.price) < 0) {
//       toast.error('Price cannot be negative');
//       return false;
//     }
//     if (parseInt(data.stockQuantity) < 0) {
//       toast.error('Stock quantity cannot be negative');
//       return false;
//     }
//     return true;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormState(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm(formState)) {
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch('/api/spare-parts', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formState),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to create spare part');
//       }

//       toast.success(data.message || 'Spare part created successfully');
//       setFormState({
//         name: '',
//         description: '',
//         price: '',
//         stockQuantity: '',
//         manufacturer: '',
//         category: ''
//       });
//     } catch (error) {
//       toast.error(error.message || 'Error creating spare part');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="create-spare-parts-container">
//       <h2>Create Spare Part</h2>

//       <form onSubmit={handleSubmit} className="spare-parts-form">
//         <div className="form-group">
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formState.name}
//             onChange={handleInputChange}
//             required
//             minLength={2}
//             maxLength={100}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="description">Description:</label>
//           <textarea
//             id="description"
//             name="description"
//             value={formState.description}
//             onChange={handleInputChange}
//             required
//             minLength={10}
//             maxLength={500}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="price">Price:</label>
//           <input
//             type="number"
//             id="price"
//             name="price"
//             value={formState.price}
//             onChange={handleInputChange}
//             required
//             min="0"
//             step="0.01"
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="stockQuantity">Stock Quantity:</label>
//           <input
//             type="number"
//             id="stockQuantity"
//             name="stockQuantity"
//             value={formState.stockQuantity}
//             onChange={handleInputChange}
//             required
//             min="0"
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="manufacturer">Manufacturer:</label>
//           <input
//             type="text"
//             id="manufacturer"
//             name="manufacturer"
//             value={formState.manufacturer}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="category">Category:</label>
//           <input
//             type="text"
//             id="category"
//             name="category"
//             value={formState.category}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <button 
//           type="submit" 
//           disabled={loading}
//           className="submit-button"
//         >
//           {loading ? 'Creating...' : 'Create Spare Part'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateSpareParts;
// startTransition
// import { useActionState } from "react";
// import { toast } from "react-toastify";
// // import axios from "axios";
// import "./CreateSpareParts.css";

// const initialState = {
//   name: "",
//   description: "",
//   price: "",
//   stockQuantity: "",
//   manufacturer: "",
//   category: "",
// };

// const validateForm = (data) => {
//   if (parseFloat(data.price) < 0) {
//     toast.error("Price cannot be negative");
//     return false;
//   }
//   if (parseInt(data.stockQuantity) < 0) {
//     toast.error("Stock quantity cannot be negative");
//     return false;
//   }
//   return true;
// };

// // Must be a synchronous function
// const createSparePart = async (prevData, formData) => {
//   if (!validateForm(formData)) {
//     return prevData;
//   }

// //   startTransition(() => {
// //     axios
// //       .post("http://localhost:3003/spare-parts", formState)
// //       .then((response) => {
// //         toast.success("Spare part created successfully");
// //         return initialState;
// //       })
// //       .catch((error) => {
// //         toast.error(
// //           error.response?.data?.message || "Error creating spare part"
// //         );
// //       });
// //   });

//   // return prevData; // Ensure state stays consistent while transition is pending
//   await new Promise(res=>setTimeout(res,2000))
//    console.log("Form data", formData);
//   console.log("Previous data ", prevData);
//   console.log("Submit called");
  
// };

// const CreateSpareParts = () => {
//   const [data,action] = useActionState(createSparePart, initialState);

//   // const handleInputChange = (e) => {
//   //   const { name, value } = e.target;
//   //   action((prevState) => ({
//   //     ...prevState,
//   //     [name]: value,
//   //   }));
//   // };

//   return (
//     <div className="create-spare-parts-container">
//       <h2>Create Spare Part</h2>
//       <form
//         action={action}
//         onSubmit={(e) => {
//           e.preventDefault();
//         //   // action(data);
//         }}
//         className="spare-parts-form"
//       >
//         <div className="form-group">
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             // value={data.name}
//             // onChange={handleInputChange}
//             required
//             minLength={2}
//             maxLength={100}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="description">Description:</label>
//           <textarea
//             id="description"
//             name="description"
//             // value={data.description}
//             // onChange={handleInputChange}
//             required
//             minLength={10}
//             maxLength={500}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="price">Price:</label>
//           <input
//             type="number"
//             id="price"
//             name="price"
//             // value={data.price}
//             // onChange={handleInputChange}
//             required
//             min="0"
//             step="0.01"
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="stockQuantity">Stock Quantity:</label>
//           <input
//             type="number"
//             id="stockQuantity"
//             name="stockQuantity"
//             // value={data.stockQuantity}
//             // onChange={handleInputChange}
//             required
//             min="0"
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="manufacturer">Manufacturer:</label>
//           <input
//             type="text"
//             id="manufacturer"
//             name="manufacturer"
//             // value={data.manufacturer}
//             // onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="category">Category:</label>
//           <input
//             type="text"
//             id="category"
//             name="category"
//             // value={data.category}
//             // onChange={handleInputChange}
//             required
//           />
//         </div>

//         <button type="submit" className="submit-button">
//           Create Spare Part
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateSpareParts;

import { useActionState } from "react";
import "./CreateSpareParts.css";

const initialState = {
  name: "",
  description: "",
  price: "",
  stockQuantity: "",
  manufacturer: "",
  category: "",
};

const validateForm = (data) => {
  const price = Number(data.price); // Convert to number
  const stockQuantity = Number(data.stockQuantity); // Convert to number

  if (isNaN(price) || price <= 0) {
    alert("Price must be greater than zero");
    return false;
  }
  if (isNaN(stockQuantity) || stockQuantity <= 0) {
    alert("Stock quantity must be greater than zero");
    return false;
  }
  return true;
};

const createSparePart = (prevData, formData) => {
  if (!validateForm(formData)) {
    // return prevData;
  }

  alert("Spare part created successfully");

  setTimeout(() => {
    console.log("Form data:", formData);
    console.log("Previous data:", prevData);
    console.log("Submit called");
  }, 2000);

  return initialState; // Reset form after successful submission
};

const CreateSpareParts = () => {
  const [data, action, pending] = useActionState(createSparePart, initialState);

  return (
    <div className="create-spare-parts-container">
      <h2>Create Spare Part</h2>
      <form action={action} className="spare-parts-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={data.name}
            required
            minLength={2}
            maxLength={100}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            defaultValue={data.description}
            required
            minLength={10}
            maxLength={500}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            defaultValue={data.price}
            required
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label htmlFor="stockQuantity">Stock Quantity:</label>
          <input
            type="number"
            id="stockQuantity"
            name="stockQuantity"
            defaultValue={data.stockQuantity}
            required
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="manufacturer">Manufacturer:</label>
          <input
            type="text"
            id="manufacturer"
            name="manufacturer"
            defaultValue={data.manufacturer}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            defaultValue={data.category}
            required
          />
        </div>

        <button disabled={pending} type="submit" className="submit-button">
          {pending ? "Submitting..." : "Create Spare Part"}
        </button>
      </form>
    </div>
  );
};

export default CreateSpareParts;

