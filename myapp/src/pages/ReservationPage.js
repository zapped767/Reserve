import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReservationPage.css';

const ReservationPage = () => {
  const navigate = useNavigate();

  // Initialize state with tables from localStorage
  const getStoredTables = () => {
    const storedTables = JSON.parse(localStorage.getItem('tables'));
    return storedTables
      ? storedTables
      : [
          { tableNumber: 1, status: 'green' },
          { tableNumber: 2, status: 'green' },
          { tableNumber: 3, status: 'green' },
          { tableNumber: 4, status: 'green' },
          { tableNumber: 5, status: 'green' },
          { tableNumber: 6, status: 'green' },
        ];
  };

  const [tables, setTables] = useState(getStoredTables());

  // Navigate to Make Reservation page
  const handleMakeReservation = () => {
    navigate('/make-reservation');
  };

  // Handle table click and update table status (optional logic for status update)
  const handleTableClick = (tableNumber) => {
    // Update table status as 'yellow' when clicked (you can modify this logic as needed)
    const updatedTables = tables.map((table) =>
      table.tableNumber === tableNumber
        ? { ...table, status: table.status === 'green' ? 'yellow' : table.status } // Example: Change status to yellow
        : table
    );
    setTables(updatedTables); // Update the state with new table data
    navigate('/table-details', { state: { tableNumber } });
  };

  // Map status to user-friendly text
  const getStatusText = (status) => {
    switch (status) {
      case 'green':
        return 'Available';
      case 'yellow':
        return 'Pending';
      case 'red':
        return 'Confirmed';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="reservation-page">
      <h1 className="reservation-title">Reservation</h1>
      <button className="make-reservation-button" onClick={handleMakeReservation}>
        Make Reservation
      </button>
      <div className="tables">
        {tables.map((table) => (
          <div
            key={table.tableNumber}
            className={`table ${table.status}`}
            onClick={() => handleTableClick(table.tableNumber)}
          >
            Table {table.tableNumber} - {getStatusText(table.status)}
          </div>
        ))}
      </div>
      <div className="status-legend">
        <p>
          <span className="green">Green:</span> Available
        </p>
        <p>
          <span className="yellow">Yellow:</span> Pending
        </p>
        <p>
          <span className="red">Red:</span> Confirmed
        </p>
      </div>
    </div>
  );
};

export default ReservationPage;
