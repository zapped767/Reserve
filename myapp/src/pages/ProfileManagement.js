import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const ProfileManagement = () => {
  const categories = ['Manager', 'Chef', 'Waiter', 'Security', 'Dishwasher'];

  const categoryToPath = {
    Manager: '/manager',
    Chef: '/chef',
    Waiter: '/waiter',
    Security: '/security',
    Dishwasher: '/dishwasher'
  };

  return (
    <div className="container">
      <h1>Profile Management</h1>
      <h2>Categories</h2>
      <ul>
        {categories.map((cat) => (
          <li key={cat}>
            <Link to={categoryToPath[cat]}>{cat}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileManagement;
