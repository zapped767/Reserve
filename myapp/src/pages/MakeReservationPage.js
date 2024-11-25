import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MakeReservationPage.css';
import ReservationTable from './ReservationTable';
import { getAllReservations, addReservation, updateReservation } from './apiService';


const MakeReservationPage = () => {
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [status, setStatus] = useState('Pending');
  const [assignedEmployee, setAssignedEmployee] = useState('');
  const [availableTables, setAvailableTables] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Fetch the available tables from localStorage or set default values
  useEffect(() => {
    const storedTables = JSON.parse(localStorage.getItem('tables')) || [
      { tableNumber: 1, status: 'green' },
      { tableNumber: 2, status: 'green' },
      { tableNumber: 3, status: 'green' },
      { tableNumber: 4, status: 'green' },
      { tableNumber: 5, status: 'green' },
      { tableNumber: 6, status: 'green' },
    ];

    // Filter available tables (status = 'green')
    const available = storedTables.filter((table) => table.status === 'green');
    setAvailableTables(available);
  }, []);

  // Fetch all reservations and update available tables
  useEffect(() => {
    const fetchAvailableTables = async () => {
      const reservations = await getAllReservations();
      const reservedTables = reservations.map((res) => res.tableNumber);

      // Mocking table data
      const allTables = Array.from({ length: 6 }, (_, i) => ({
        tableNumber: i + 1,
        status: reservedTables.includes(i + 1) ? 'red' : 'green',
      }));

      setAvailableTables(allTables.filter((table) => table.status === 'green'));
    };

    fetchAvailableTables();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate a unique ID if it's a new reservation
    const reservationData = { // Generate ID if new reservation
      customerName,
      contactNumber,
      tableNumber,
      reservationDate,
      reservationTime,
      numberOfGuests,
      status,
      assignedEmployee,
    };

    if (editIndex !== null) {
      await updateReservation(editIndex, reservationData); // Use updateReservation function here
    } else {
      await addReservation(reservationData); // Use addReservation function here
    }

    setEditIndex(null);

    // Fetch tables from localStorage, or default to an empty array if not available
    const storedTables = JSON.parse(localStorage.getItem('tables')) || [];

    if (storedTables.length > 0) {
      const updatedTables = storedTables.map((table) => {
        if (table.tableNumber === parseInt(tableNumber)) {
          return { ...table, status: 'red' }; // Mark the table as Confirmed
        }
        return table;
      });
      localStorage.setItem('tables', JSON.stringify(updatedTables));
    }

    navigate('/');
  };

  const handleEdit = (index) => {
    const storedReservations = JSON.parse(localStorage.getItem('reservations')) || [];
  
    // Check if the index is valid and there is data at that index
    if (storedReservations && storedReservations[index]) {
      const reservation = storedReservations[index];
      setCustomerName(reservation.customerName);
      setContactNumber(reservation.contactNumber);
      setTableNumber(reservation.tableNumber);
      setReservationDate(reservation.reservationDate);
      setReservationTime(reservation.reservationTime);
      setNumberOfGuests(reservation.numberOfGuests);
      setStatus(reservation.status);
      setAssignedEmployee(reservation.assignedEmployee);
      setEditIndex(index);
    } else {
      console.error("Reservation data not found or index is invalid.");
    }
  };
  

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      const storedReservations = JSON.parse(localStorage.getItem('reservations')) || [];
      storedReservations.splice(index, 1);
      localStorage.setItem('reservations', JSON.stringify(storedReservations));
    }
  };

  return (
    <div className="make-reservation-form">
      <h1>Make a Reservation</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Customer Name:
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Contact Number:
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Table Number:
          <select
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            required
          >
            <option value="">Select Table</option>
            {availableTables.map((table) => (
              <option key={table.tableNumber} value={table.tableNumber}>
                Table {table.tableNumber}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Reservation Date:
          <input
            type="date"
            value={reservationDate}
            onChange={(e) => setReservationDate(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Reservation Time:
          <input
            type="time"
            value={reservationTime}
            onChange={(e) => setReservationTime(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Number of Guests:
          <input
            type="number"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Status:
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </label>
        <br />
        {status === 'Confirmed' && (
          <label>
            Assigned Employee:
            <input
              type="text"
              value={assignedEmployee}
              onChange={(e) => setAssignedEmployee(e.target.value)}
              required
            />
          </label>
        )}
        <br />
        <button type="submit">Submit Reservation</button>
      </form>
      <ReservationTable onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default MakeReservationPage;
