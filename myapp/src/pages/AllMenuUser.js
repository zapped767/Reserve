import React, { useEffect, useState } from 'react';
import axios from 'axios';

import "./AllMenu.css"; // Add any custom styling here for the table

function AllMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);


  // Fetch all menu items from the backend
  useEffect(() => {
    axios.get('http://localhost:8080/api/menu/all')
      .then(response => {
        setMenuItems(response.data); // Update the state with the fetched menu items
      })
      .catch(error => console.error('Error fetching menu items:', error));
  }, []);

 
  

  

  return (
    <div>
      <h2>All Item Price Details</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Item Name</th>
            <th>Description</th>
            <th>Price</th>
          
          </tr>
        </thead>
        <tbody>
          {menuItems.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>${item.price}</td>
              
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
            
          </form>
        </div>
      )}
    </div>
  );
}

export default AllMenu;
