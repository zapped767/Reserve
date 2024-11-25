import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const ManagerPage = () => {
  const [managers, setManagers] = useState([]);
  const [editingManager, setEditingManager] = useState(null);
  const [newManager, setNewManager] = useState({
    name: '',
    contact: '',
    address: '',
  });

  // Fetch all managers from the backend
  const fetchManagers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/managers/all');
      setManagers(response.data); // Update state with fetched manager data
    } catch (error) {
      console.error('Error fetching managers:', error);
    }
  };

  // Add a new manager
  const addManager = async () => {
    try {
      await axios.post('http://localhost:8080/api/managers/add', newManager);
      alert('Manager added successfully');
      setNewManager({ name: '', contact: '', address: '' }); // Reset form fields
      fetchManagers(); // Reload manager list after adding a new one
    } catch (error) {
      alert('Error adding manager');
      console.error(error);
    }
  };

  // Update manager details
  const updateManager = async (updatedManager) => {
    try {
      await axios.put(`http://localhost:8080/api/managers/${updatedManager.id}`, updatedManager);
      alert('Manager updated successfully');
      fetchManagers(); // Reload manager list after update
      setEditingManager(null); // Reset editing state
    } catch (error) {
      alert('Error updating manager');
      console.error(error);
    }
  };

  // Delete a manager
  const deleteManager = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/managers/${id}`);
      alert('Manager deleted successfully');
      setManagers(managers.filter(manager => manager.id !== id)); // Update local state
    } catch (error) {
      alert('Error deleting manager');
      console.error(error);
    }
  };

  // Fetch managers on component mount
  useEffect(() => {
    fetchManagers();
  }, []);

  return (
    <div className="container">
      <h1>Manager Page</h1>

      {/* Add Manager Form */}
      <div className="add-manager-form">
        <h2>Add New Manager</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          addManager();
        }}>
          <div>
            <label>Name: </label>
            <input
              type="text"
              value={newManager.name}
              onChange={(e) => setNewManager({ ...newManager, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Contact Number: </label>
            <input
              type="text"
              value={newManager.contact}
              onChange={(e) => setNewManager({ ...newManager, contact: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Address: </label>
            <input
              type="text"
              value={newManager.address}
              onChange={(e) => setNewManager({ ...newManager, address: e.target.value })}
              required
            />
          </div>
          <button type="submit">Add Manager</button>
        </form>
      </div>

      {/* Display Manager List */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {managers.map(manager => (
            <tr key={manager.id}>
              <td>{manager.name}</td>
              <td>{manager.contact}</td>
              <td>{manager.address}</td>
              <td>
                <button onClick={() => setEditingManager(manager)}>Edit</button>
                <button onClick={() => deleteManager(manager.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Manager Form */}
      {editingManager && (
        <div className="container">
          <h2>Edit Manager</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            updateManager(editingManager);
          }}>
            <div>
              <label>Name: </label>
              <input
                type="text"
                value={editingManager.name}
                onChange={(e) => setEditingManager({ ...editingManager, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Contact Number: </label>
              <input
                type="text"
                value={editingManager.contact}
                onChange={(e) => setEditingManager({ ...editingManager, contact: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Address: </label>
              <input
                type="text"
                value={editingManager.address}
                onChange={(e) => setEditingManager({ ...editingManager, address: e.target.value })}
                required
              />
            </div>
            <button type="submit">Update</button>
            <button type="button" onClick={() => setEditingManager(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManagerPage;
