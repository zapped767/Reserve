import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./AllMenu.css"; // Add any custom styling here for the table

function AllMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  // Fetch all menu items from the backend
  useEffect(() => {
    axios.get('http://localhost:8080/api/menu/all')
      .then(response => {
        setMenuItems(response.data); // Update the state with the fetched menu items
      })
      .catch(error => console.error('Error fetching menu items:', error));
  }, []);

  // Handle the update functionality
  const handleUpdate = (item) => {
    setSelectedItem(item); // Set selected item for update
    navigate('/UpdateMenu', { state: { menuItem: item } }); // Navigate to update page with item data
  };

  // Handle the delete functionality
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/menu/delete/${id}`);
      alert('Menu item deleted successfully');
      setMenuItems(menuItems.filter(item => item.id !== id)); // Remove item from the state after deletion
    } catch (error) {
      alert('Error deleting item');
      console.error(error);
    }
  };

  // Handle the update action from the form
  const handleSaveUpdate = async (updatedItem) => {
    try {
      await axios.put(`http://localhost:8080/api/menu/${updatedItem.id}`, updatedItem);
      alert('Menu item updated successfully');
      setMenuItems(menuItems.map(item => (item.id === updatedItem.id ? updatedItem : item))); // Update the item in the local state
      setSelectedItem(null); // Reset selected item after update
    } catch (error) {
      alert('Error updating item');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>All Menu Items</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Item Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>${item.price}</td>
              <td>
                <button onClick={() => handleUpdate(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Optionally, you can show the form for updating an item if selected */}
      {selectedItem && (
        <div>
          <h3>Update Menu Item</h3>
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
              <label>Price:</label>
              <input
                type="number"
                value={selectedItem.price}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, price: parseFloat(e.target.value) })
                }
              />
            </div>
            <button type="button" onClick={() => handleSaveUpdate(selectedItem)}>
              Save Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AllMenu;
