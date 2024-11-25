import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./AddItem.css";


const AddItem = () => {
  const [itemID, setItemID] = useState('');
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();
  const handleClick=()=>{navigate("/AllItems");}

  // Handle form submission to add item
  const handleAddItem = async (e) => {
    e.preventDefault();

    // Create the item data object to be sent to the backend
    const newItem = {
      id: itemID,
      name: itemName,
      quantity: quantity,
      description: description,
      price: price,
    };

    try {
      // POST request to add the item
      await axios.post('http://localhost:8080/api/inventory/add', newItem);

      // Navigate to the home page upon success
      navigate('/');
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add the item. Please try again.');
    }
  };

  return (
    <div className='add'>
      <h2>Add New Item</h2>
      <form onSubmit={handleAddItem}>
        <div>
          <label>Item Name:</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Item ID:</label>
          <input
            type="text"
            value={itemID}
            onChange={(e) => setItemID(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <button type="submit" >Add Item</button>
        <button type="submit" onClick={handleClick}>Cancel</button>
      </form>
    </div>
  );
};

export default AddItem;
