import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const DishwasherPage = () => {
  const [dishwashers, setDishwashers] = useState([]);
  const [editingDishwasher, setEditingDishwasher] = useState(null);
  const [newDishwasher, setNewDishwasher] = useState({
    name: '',
    address: '',
    contact: ''
  });

  // Fetch all dishwashers from the backend
  const fetchDishwashers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/dishwashers/all');
      setDishwashers(response.data); // Update state with fetched dishwasher data
    } catch (error) {
      console.error('Error fetching dishwashers:', error);
    }
  };

  // Add a new dishwasher
  const addDishwasher = async () => {
    try {
      await axios.post('http://localhost:8080/api/dishwashers/add', newDishwasher);
      alert('Dishwasher added successfully');
      setNewDishwasher({ name: '', address: '', contact: '' }); // Reset form fields
      fetchDishwashers(); // Reload dishwasher list after adding a new one
    } catch (error) {
      alert('Error adding dishwasher');
      console.error(error);
    }
  };

  // Update dishwasher details
  const updateDishwasher = async (updatedDishwasher) => {
    try {
      await axios.put(`http://localhost:8080/api/dishwashers/${updatedDishwasher.id}`, updatedDishwasher);
      alert('Dishwasher updated successfully');
      fetchDishwashers(); // Reload dishwasher list after update
      setEditingDishwasher(null); // Reset editing state
    } catch (error) {
      alert('Error updating dishwasher');
      console.error(error);
    }
  };

  // Delete a dishwasher
  const deleteDishwasher = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/dishwashers/${id}`);
      alert('Dishwasher deleted successfully');
      setDishwashers(dishwashers.filter(dishwasher => dishwasher.id !== id)); // Update local state
    } catch (error) {
      alert('Error deleting dishwasher');
      console.error(error);
    }
  };

  // Fetch dishwashers on component mount
  useEffect(() => {
    fetchDishwashers();
  }, []);

  return (
    <div className="container">
      <h1>Dishwasher Page</h1>

      {/* Add Dishwasher Form */}
      <div className="add-dishwasher-form">
        <h2>Add New Dishwasher</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          addDishwasher();
        }}>
          <div>
            <label>Name: </label>
            <input
              type="text"
              value={newDishwasher.name}
              onChange={(e) => setNewDishwasher({ ...newDishwasher, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Address: </label>
            <input
              type="text"
              value={newDishwasher.address}
              onChange={(e) => setNewDishwasher({ ...newDishwasher, address: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Contact Number: </label>
            <input
              type="text"
              value={newDishwasher.contact}
              onChange={(e) => setNewDishwasher({ ...newDishwasher, contact: e.target.value })}
              required
            />
          </div>
          <button type="submit">Add Dishwasher</button>
        </form>
      </div>

      {/* Display Dishwasher List */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dishwashers.map(dishwasher => (
            <tr key={dishwasher.id}>
              <td>{dishwasher.name}</td>
              <td>{dishwasher.address}</td>
              <td>{dishwasher.contact}</td>
              <td>
                <button onClick={() => setEditingDishwasher(dishwasher)}>Edit</button>
                <button onClick={() => deleteDishwasher(dishwasher.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Dishwasher Form */}
      {editingDishwasher && (
        <div className="container">
          <h2>Edit Dishwasher</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            updateDishwasher(editingDishwasher);
          }}>
            <div>
              <label>Name: </label>
              <input
                type="text"
                value={editingDishwasher.name}
                onChange={(e) => setEditingDishwasher({ ...editingDishwasher, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Address: </label>
              <input
                type="text"
                value={editingDishwasher.address}
                onChange={(e) => setEditingDishwasher({ ...editingDishwasher, address: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Contact Number: </label>
              <input
                type="text"
                value={editingDishwasher.contact}
                onChange={(e) => setEditingDishwasher({ ...editingDishwasher, contact: e.target.value })}
                required
              />
            </div>
            <button type="submit">Update</button>
            <button type="button" onClick={() => setEditingDishwasher(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DishwasherPage;
