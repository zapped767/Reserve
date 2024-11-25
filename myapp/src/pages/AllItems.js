import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./AllItems.css";
import { useNavigate } from 'react-router-dom';


const AllItems = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate =useNavigate();
  const handleOrderClick=()=>{navigate("/Order");}
  const handleAddItemClick=()=>{navigate("/AddItem");}
  const handlehomeClick=()=>{navigate("/Homepage");}

  // Fetch all items from the backend
  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/inventory/items');
      
      setItems(response.data); // Update items state with fetched data
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  // Handle the update functionality
  const handleUpdate = async () => {
    if (!selectedItem) return;

    try {
      await axios.put(`http://localhost:8080/api/inventory/items/${selectedItem.id}`, selectedItem);
      alert('Item updated successfully');
      fetchItems(); // Reload the item list after update
      setSelectedItem(null); // Reset selected item
    } catch (error) {
      alert('Error updating item');
      console.error(error);
    }
  };

  // Handle the delete functionality
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/inventory/items/${id}`);
      alert('Item deleted successfully');
      setItems(items.filter(item => item.id !== id)); // Update local state
    } catch (error) {
      alert('Error deleting item');
      console.error(error);
    }
  };

  // UseEffect to load items initially
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h2>All Items</h2>
      <nav className="header-nav">

          <button className="header-button" onClick={handlehomeClick}>Home</button>
          <button className="header-button" onClick={handleOrderClick}>Add Menu</button>
          <button className="header-button" onClick={handleAddItemClick}>Add Inventory</button>
          
         
        </nav>
      <table border="1">
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Item Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>
                <button onClick={() => navigate('/update',{state:{id:item.id}})}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedItem && (
        <div>
          <h3>Update Item</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <label>Item Name:</label>
              <input
                type="text"
                value={selectedItem.name}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, name: e.target.value })
                }
              />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                value={selectedItem.description}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, description: e.target.value })
                }
              />
            </div>
            <div>
              <label>Quantity:</label>
              <input
                type="number"
                value={selectedItem.quantity}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, quantity: Number(e.target.value) })
                }
              />
            </div>
            <div>
              <label>Price:</label>
              <input
                type="number"
                value={selectedItem.price}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, price: parseFloat(e.target.value) })
                }
              />
            </div>
            <button type="button" onClick={handleUpdate}>
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AllItems;
