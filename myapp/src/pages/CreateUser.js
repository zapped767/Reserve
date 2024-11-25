import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const CreateUser = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    position: '',
    address: '',
    contact: '',
  });
  const navigate = useNavigate();

  // Fetch all users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users/all');
      setUsers(response.data); // Update state with fetched user data
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Update a user
  const updateUser = async (updatedUser) => {
    try {
      await axios.put(`http://localhost:8080/api/users/${updatedUser.id}`, updatedUser);
      alert('User updated successfully');
      fetchUsers(); // Reload the user list after update
      setEditingUser(null); // Reset editing state
    } catch (error) {
      alert('Error updating user');
      console.error(error);
    }
  };

  // Add a new user
  const addUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/users/add', newUser);
      alert('User added successfully');
      fetchUsers(); // Reload the user list
      setNewUser({ name: '', position: '', address: '', contact: '' }); // Reset form
    } catch (error) {
      alert('Error adding user');
      console.error(error);
    }
  };

  // Delete a user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`);
      alert('User deleted successfully');
      setUsers(users.filter((user) => user.id !== id)); // Update local state
    } catch (error) {
      alert('Error deleting user');
      console.error(error);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addUser(e);

    // Navigate to the corresponding position page
    switch (newUser.position) {
      case 'Manager':
        navigate('/manager');
        break;
      case 'Chef':
        navigate('/chef');
        break;
      case 'Waiter':
        navigate('/waiter');
        break;
      case 'Security':
        navigate('/security');
        break;
      case 'Dishwasher':
        navigate('/dishwasher');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <div className="container">
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Position: </label>
          <select
            value={newUser.position}
            onChange={(e) => setNewUser({ ...newUser, position: e.target.value })}
            required
          >
            <option value="">Select Position</option>
            <option value="Manager">Manager</option>
            <option value="Chef">Chef</option>
            <option value="Waiter">Waiter</option>
            <option value="Security">Security</option>
            <option value="Dishwasher">Dishwasher</option>
          </select>
        </div>
        <div>
          <label>Address: </label>
          <input
            type="text"
            value={newUser.address}
            onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Contact Number: </label>
          <input
            type="text"
            value={newUser.contact}
            onChange={(e) => setNewUser({ ...newUser, contact: e.target.value })}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.position}</td>
              <td>{user.address}</td>
              <td>{user.contact}</td>
              <td>
                <button onClick={() => setEditingUser(user)}>Edit</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <div className="edit-container">
          <h2>Edit User</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateUser(editingUser);
            }}
          >
            <div>
              <label>Name: </label>
              <input
                type="text"
                value={editingUser.name}
                onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Position: </label>
              <select
                value={editingUser.position}
                onChange={(e) => setEditingUser({ ...editingUser, position: e.target.value })}
                required
              >
                <option value="Manager">Manager</option>
                <option value="Chef">Chef</option>
                <option value="Waiter">Waiter</option>
                <option value="Security">Security</option>
                <option value="Dishwasher">Dishwasher</option>
              </select>
            </div>
            <div>
              <label>Address: </label>
              <input
                type="text"
                value={editingUser.address}
                onChange={(e) => setEditingUser({ ...editingUser, address: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Contact Number: </label>
              <input
                type="text"
                value={editingUser.contact}
                onChange={(e) => setEditingUser({ ...editingUser, contact: e.target.value })}
                required
              />
            </div>
            <button type="submit">Update</button>
            <button type="button" onClick={() => setEditingUser(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateUser;
