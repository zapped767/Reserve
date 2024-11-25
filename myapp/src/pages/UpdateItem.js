import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './UpdateItem.css';

const UpdateItem = () => {
  const [formData, setFormData] = useState({
    itemID: '',
    itemName: '',
    quantity: '',
    description: '',
    price: '',
  });

  const navigate = useNavigate();
  const location = useLocation();

  // Fetch item data when the component loads
  useEffect(() => {
    const fetchItemData = async (id) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/inventory/items/${id}`);
        const item = response.data;
        setFormData({
          itemID: item.id,
          itemName: item.name,
          quantity: item.quantity,
          description: item.description,
          price: item.price,
        });
      } catch (error) {
        console.error('Error fetching item data:', error);
        alert('Failed to fetch item data.');
      }
    };

    if (location.state && location.state.id) {
      fetchItemData(location.state.id);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();

    const updatedItem = {
      id: formData.itemID,
      name: formData.itemName,
      quantity: Number(formData.quantity),
      description: formData.description,
      price: Number(formData.price),
    };

    try {
      await axios.put(`http://localhost:8080/api/inventory/items/${formData.itemID}`, updatedItem);
      alert('Item updated successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Failed to update the item. Please try again.');
    }
  };

  return (
    <div className="update-item-page">
      <div className="update-item-container">
        <h1 className="update-item-title">Update Item</h1>
        <form className="update-item-form" onSubmit={handleUpdateItem}>
          <div className="form-group">
            <label className="form-label">Item ID:</label>
            <input
              type="text"
              name="itemID"
              value={formData.itemID}
              className="form-input"
              readOnly
            />
          </div>
          <div className="form-group">
            <label className="form-label">Item Name:</label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              className="form-input"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Description:</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              className="form-input"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              className="form-input"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              className="form-input"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="btn btn-primary">
              Update Item
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/AllItems')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
