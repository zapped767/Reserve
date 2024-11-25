import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function OrderPage() {
  const navigate = useNavigate();
  const handleOrderClick=()=>{navigate("/");}
  const [menuItem, setMenuItem] = useState({
    name: '',
    description: '',
    price: ''
  });

  // POST method to add a new menu item
  const handleAddMenuItem = (e) => {
    e.preventDefault(); // Prevent form submission
    axios.post('http://localhost:8080/api/menu/add', menuItem)
      .then(response => {
        console.log('Menu item added successfully:', response.data);
        alert('Menu item added successfully!');
        setMenuItem({ name: '', description: '', price: '' }); // Reset form fields

        // Navigate to the AllMenu page and pass the new menu item
        navigate('/AllMenu', { state: { newMenuItem: response.data } });
      })
      .catch(error => {
        console.error('Error adding menu item:', error);
        alert('Failed to add menu item.');
      });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMenuItem({ ...menuItem, [name]: value });
  };

  return (
    <div>
      <h2>Add Menu</h2>
      <form onSubmit={handleAddMenuItem}>
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={menuItem.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={menuItem.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={menuItem.price}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Menu Item</button>
        <button type="submit" onClick={handleOrderClick}>cancel</button>
      </form>
    </div>
  );
}

export default OrderPage;
