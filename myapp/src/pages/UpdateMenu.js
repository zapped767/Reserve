import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import "./UpdateMenu.css"; // Add any custom styling here for the form

const UpdateMenu = () => {
  const [menuItem, setMenuItem] = useState({
    id: '',
    name: '',
    description: '',
    price: 0,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const handleupdateClick=()=>{navigate("/AllMenu");}

  // Fetch menu item data passed through location state (from AllMenu page)
  useEffect(() => {
    if (location.state && location.state.menuItem) {
      setMenuItem(location.state.menuItem); // Set the selected item to state
    }
  }, [location.state]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMenuItem({ ...menuItem, [name]: value });
  };

  // Handle the update functionality
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      await axios.put(`http://localhost:8080/api/menu/update/${menuItem.id}`, menuItem);
      alert('Menu item updated successfully');
      navigate('/AllMenu'); // Navigate back to the All Menu page
    } catch (error) {
      alert('Error updating item');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Update Menu Item</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Item Name:</label>
          <input
            type="text"
            name="name"
            value={menuItem.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={menuItem.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={menuItem.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>quantity</label>
          <input
            type="number"
            name="quantity"
            value={menuItem.quantity}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Update Item</button>
        <button type="submit" onClick={handleupdateClick}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdateMenu;
