import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './CreateSpareParts.css';

const CreateSpareParts = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stockQuantity: '',
    manufacturer: '',
    category: ''
  });

  const [isMultipleEntry, setIsMultipleEntry] = useState(false);
  const [multipleEntries, setMultipleEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateSparePartData = (data) => {
    if (parseFloat(data.price) < 0) {
      toast.error('Price cannot be negative');
      return false;
    }
    if (parseInt(data.stockQuantity) < 0) {
      toast.error('Stock quantity cannot be negative');
      return false;
    }
    return true;
  };

  const addToMultipleEntries = () => {
    if (!validateSparePartData(formData)) return;

    setMultipleEntries(prev => [...prev, { ...formData }]);
    setFormData({
      name: '',
      description: '',
      price: '',
      stockQuantity: '',
      manufacturer: '',
      category: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let dataToSubmit;
      let response;

      if (isMultipleEntry) {
        if (multipleEntries.length === 0) {
          toast.error('Please add at least one spare part');
          setLoading(false);
          return;
        }
        dataToSubmit = multipleEntries;
      } else {
        if (!validateSparePartData(formData)) {
          setLoading(false);
          return;
        }
        dataToSubmit = formData;
      }

      response = await axios.post('/api/spare-parts', dataToSubmit);

      if (response.data.success) {
        toast.success(response.data.message);
        // Reset form
        setFormData({
          name: '',
          description: '',
          price: '',
          stockQuantity: '',
          manufacturer: '',
          category: ''
        });
        setMultipleEntries([]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating spare part(s)');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-spare-parts-container">
      <h2>{isMultipleEntry ? 'Create Multiple Spare Parts' : 'Create Spare Part'}</h2>
      
      <div className="entry-mode-toggle">
        <label>
          <input
            type="checkbox"
            checked={isMultipleEntry}
            onChange={() => setIsMultipleEntry(!isMultipleEntry)}
          />
          Enable multiple entries
        </label>
      </div>

      <form onSubmit={handleSubmit} className="spare-parts-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label>Stock Quantity:</label>
          <input
            type="number"
            name="stockQuantity"
            value={formData.stockQuantity}
            onChange={handleInputChange}
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label>Manufacturer:</label>
          <input
            type="text"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          />
        </div>

        {isMultipleEntry ? (
          <div className="multiple-entries-section">
            <button 
              type="button" 
              onClick={addToMultipleEntries}
              className="add-entry-btn"
            >
              Add Entry
            </button>
            
            {multipleEntries.length > 0 && (
              <div className="entries-list">
                <h3>Added Entries ({multipleEntries.length})</h3>
                <ul>
                  {multipleEntries.map((entry, index) => (
                    <li key={index}>
                      {entry.name} - {entry.category} - ${entry.price}
                      <button
                        type="button"
                        onClick={() => setMultipleEntries(prev => 
                          prev.filter((_, i) => i !== index)
                        )}
                        className="remove-entry-btn"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : null}

        <button 
          type="submit" 
          className="submit-btn" 
          disabled={loading || (isMultipleEntry && multipleEntries.length === 0)}
        >
          {loading ? 'Creating...' : 'Create Spare Part(s)'}
        </button>
      </form>
    </div>
  );
};

export default CreateSpareParts;
