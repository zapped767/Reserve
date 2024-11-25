import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const WaiterPage = () => {
  const [waiters, setWaiters] = useState([]);
  const [editingWaiter, setEditingWaiter] = useState(null);
  const [newWaiter, setNewWaiter] = useState({
    name: '',
    address: '',
    contact: ''
  });

  // Fetch all waiters from the backend
  const fetchWaiters = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/waiters/all');
      setWaiters(response.data); // Update state with fetched waiter data
    } catch (error) {
      console.error('Error fetching waiters:', error);
    }
  };

  // Add a new waiter
  const addWaiter = async () => {
    try {
      await axios.post('http://localhost:8080/api/waiters/add', newWaiter);
      alert('Waiter added successfully');
      setNewWaiter({ name: '', address: '', contact: '' }); // Reset form fields
      fetchWaiters(); // Reload waiter list after adding a new one
    } catch (error) {
      alert('Error adding waiter');
      console.error(error);
    }
  };

  // Update waiter details
  const updateWaiter = async (updatedWaiter) => {
    try {
      await axios.put(`http://localhost:8080/api/waiters/${updatedWaiter.id}`, updatedWaiter);
      alert('Waiter updated successfully');
      fetchWaiters(); // Reload waiter list after update
      setEditingWaiter(null); // Reset editing state
    } catch (error) {
      alert('Error updating waiter');
      console.error(error);
    }
  };

  // Delete a waiter
  const deleteWaiter = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/waiters/${id}`);
      alert('Waiter deleted successfully');
      setWaiters(waiters.filter(waiter => waiter.id !== id)); // Update local state
    } catch (error) {
      alert('Error deleting waiter');
      console.error(error);
    }
  };

  // Fetch waiters on component mount
  useEffect(() => {
    fetchWaiters();
  }, []);

  return (
    <div className="container">
      <h1>Waiter Page</h1>

      {/* Add Waiter Form */}
      <div className="add-waiter-form">
        <h2>Add New Waiter</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          addWaiter();
        }}>
          <div>
            <label>Name: </label>
            <input
              type="text"
              value={newWaiter.name}
              onChange={(e) => setNewWaiter({ ...newWaiter, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Address: </label>
            <input
              type="text"
              value={newWaiter.address}
              onChange={(e) => setNewWaiter({ ...newWaiter, address: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Contact Number: </label>
            <input
              type="text"
              value={newWaiter.contact}
              onChange={(e) => setNewWaiter({ ...newWaiter, contact: e.target.value })}
              required
            />
          </div>
          <button type="submit">Add Waiter</button>
        </form>
      </div>

      {/* Display Waiter List */}
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
          {waiters.map(waiter => (
            <tr key={waiter.id}>
              <td>{waiter.name}</td>
              <td>{waiter.address}</td>
              <td>{waiter.contact}</td>
              <td>
                <button onClick={() => setEditingWaiter(waiter)}>Edit</button>
                <button onClick={() => deleteWaiter(waiter.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Waiter Form */}
      {editingWaiter && (
        <div className="container">
          <h2>Edit Waiter</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            updateWaiter(editingWaiter);
          }}>
            <div>
              <label>Name: </label>
              <input
                type="text"
                value={editingWaiter.name}
                onChange={(e) => setEditingWaiter({ ...editingWaiter, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Address: </label>
              <input
                type="text"
                value={editingWaiter.address}
                onChange={(e) => setEditingWaiter({ ...editingWaiter, address: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Contact Number: </label>
              <input
                type="text"
                value={editingWaiter.contact}
                onChange={(e) => setEditingWaiter({ ...editingWaiter, contact: e.target.value })}
                required
              />
            </div>
            <button type="submit">Update</button>
            <button type="button" onClick={() => setEditingWaiter(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default WaiterPage;
