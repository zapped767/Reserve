import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const SecurityPage = () => {
  const [securities, setSecurities] = useState([]);
  const [editingSecurity, setEditingSecurity] = useState(null);
  const [newSecurity, setNewSecurity] = useState({
    name: '',
    address: '',
    contact: ''
  });

  // Fetch all securities from the backend
  const fetchSecurities = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/securities/all');
      setSecurities(response.data); // Update state with fetched security data
    } catch (error) {
      console.error('Error fetching securities:', error);
    }
  };

  // Add a new security
  const addSecurity = async () => {
    try {
      await axios.post('http://localhost:8080/api/securities/add}', newSecurity);
      alert('Security added successfully');
      setNewSecurity({ name: '', address: '', contact: '' }); // Reset form fields
      fetchSecurities(); // Reload security list after adding a new one
    } catch (error) {
      alert('Error adding security');
      console.error(error);
    }
  };

  // Update security details
  const updateSecurity = async (updatedSecurity) => {
    try {
      await axios.put(`http://localhost:8080/api/securities/${updatedSecurity.id}`, updatedSecurity);
      alert('Security updated successfully');
      fetchSecurities(); // Reload security list after update
      setEditingSecurity(null); // Reset editing state
    } catch (error) {
      alert('Error updating security');
      console.error(error);
    }
  };

  // Delete a security
  const deleteSecurity = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/securities/${id}`);
      alert('Security deleted successfully');
      setSecurities(securities.filter(security => security.id !== id)); // Update local state
    } catch (error) {
      alert('Error deleting security');
      console.error(error);
    }
  };

  // Fetch securities on component mount
  useEffect(() => {
    fetchSecurities();
  }, []);

  return (
    <div className="container">
      <h1>Security Page</h1>

      {/* Add Security Form */}
      <div className="add-security-form">
        <h2>Add New Security</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          addSecurity();
        }}>
          <div>
            <label>Name: </label>
            <input
              type="text"
              value={newSecurity.name}
              onChange={(e) => setNewSecurity({ ...newSecurity, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Address: </label>
            <input
              type="text"
              value={newSecurity.address}
              onChange={(e) => setNewSecurity({ ...newSecurity, address: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Contact Number: </label>
            <input
              type="text"
              value={newSecurity.contact}
              onChange={(e) => setNewSecurity({ ...newSecurity, contact: e.target.value })}
              required
            />
          </div>
          <button type="submit">Add Security</button>
        </form>
      </div>

      {/* Display Security List */}
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
          {securities.map(security => (
            <tr key={security.id}>
              <td>{security.name}</td>
              <td>{security.address}</td>
              <td>{security.contact}</td>
              <td>
                <button onClick={() => setEditingSecurity(security)}>Edit</button>
                <button onClick={() => deleteSecurity(security.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Security Form */}
      {editingSecurity && (
        <div className="container">
          <h2>Edit Security</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            updateSecurity(editingSecurity);
          }}>
            <div>
              <label>Name: </label>
              <input
                type="text"
                value={editingSecurity.name}
                onChange={(e) => setEditingSecurity({ ...editingSecurity, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Address: </label>
              <input
                type="text"
                value={editingSecurity.address}
                onChange={(e) => setEditingSecurity({ ...editingSecurity, address: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Contact Number: </label>
              <input
                type="text"
                value={editingSecurity.contact}
                onChange={(e) => setEditingSecurity({ ...editingSecurity, contact: e.target.value })}
                required
              />
            </div>
            <button type="submit">Update</button>
            <button type="button" onClick={() => setEditingSecurity(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SecurityPage;
