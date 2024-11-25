import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const ChefPage = () => {
  const [chefs, setChefs] = useState([]);
  const [editingChef, setEditingChef] = useState(null);
  const [newChef, setNewChef] = useState({
    name: '',
    address: '',
    contactNumber: '',
  });

  // Fetch all chefs from the backend
  const fetchChefs = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/chefs/all');
      setChefs(response.data); // Update state with fetched chef data
    } catch (error) {
      console.error('Error fetching chefs:', error);
    }
  };

  // Add a new chef
  const addChef = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/chefs/add', newChef);
      alert('Chef added successfully');
      fetchChefs(); // Reload the chef list
      setNewChef({ name: '', address: '', contactNumber: '' }); // Reset form
    } catch (error) {
      alert('Error adding chef');
      console.error(error);
    }
  };

  // Update a chef
  const updateChef = async (updatedChef) => {
    try {
      await axios.put(`http://localhost:8080/api/chefs/${updatedChef.id}`, updatedChef);
      alert('Chef updated successfully');
      fetchChefs(); // Reload the chef list after update
      setEditingChef(null); // Reset editing state
    } catch (error) {
      alert('Error updating chef');
      console.error(error);
    }
  };

  // Delete a chef
  const deleteChef = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/chefs/${id}`);
      alert('Chef deleted successfully');
      setChefs(chefs.filter(chef => chef.id !== id)); // Update local state
    } catch (error) {
      alert('Error deleting chef');
      console.error(error);
    }
  };

  // Fetch chefs on component mount
  useEffect(() => {
    fetchChefs();
  }, []);

  return (
    <div className="container">
      <h1>Chef Page</h1>

      {/* Add New Chef Form */}
      <div className="add-container">
        <h2>Add New Chef</h2>
        <form onSubmit={addChef}>
          <div>
            <label>Name: </label>
            <input
              type="text"
              value={newChef.name}
              onChange={(e) => setNewChef({ ...newChef, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Address: </label>
            <input
              type="text"
              value={newChef.address}
              onChange={(e) => setNewChef({ ...newChef, address: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Contact Number: </label>
            <input
              type="text"
              value={newChef.contactNumber}
              onChange={(e) => setNewChef({ ...newChef, contactNumber: e.target.value })}
              required
            />
          </div>
          <button type="submit">Add Chef</button>
        </form>
      </div>

      {/* Chef List */}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {chefs.map(chef => (
            <tr key={chef.id}>
              <td>{chef.id}</td>
              <td>{chef.name}</td>
              <td>{chef.address}</td>
              <td>{chef.contactNumber}</td>
              <td>
                <button onClick={() => setEditingChef(chef)}>Edit</button>
                <button onClick={() => deleteChef(chef.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Chef Form */}
      {editingChef && (
        <div className="edit-container">
          <h2>Edit Chef</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            updateChef(editingChef);
          }}>
            <div>
              <label>Name: </label>
              <input
                type="text"
                value={editingChef.name}
                onChange={(e) => setEditingChef({ ...editingChef, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Address: </label>
              <input
                type="text"
                value={editingChef.address}
                onChange={(e) => setEditingChef({ ...editingChef, address: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Contact Number: </label>
              <input
                type="text"
                value={editingChef.contactNumber}
                onChange={(e) => setEditingChef({ ...editingChef, contactNumber: e.target.value })}
                required
              />
            </div>
            <button type="submit">Update</button>
            <button type="button" onClick={() => setEditingChef(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChefPage;
