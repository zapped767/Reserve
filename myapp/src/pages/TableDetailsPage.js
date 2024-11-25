import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './TableDetailsPage.css';
import { getAllReservations } from './apiService';

const TableDetailsPage = () => {
  const location = useLocation();
  const { tableNumber } = location.state || {};
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    const fetchReservation = async () => {
      const reservations = await getAllReservations();
      const res = reservations.find((r) => r.tableNumber === tableNumber);
      setReservation(res);
    };

    fetchReservation();
  }, [tableNumber]);

  return (
    <div className="table-details">
      <h1>Table {tableNumber} Details</h1>
      {reservation ? (
        <div>
          <p>Customer Name: {reservation.customerName}</p>
          <p>Reservation Date: {reservation.reservationDate}</p>
          <p>Reservation Time: {reservation.reservationTime}</p>
          <p>Number of Guests: {reservation.numberOfGuests}</p>
          <p>Status: {reservation.status}</p>
          {reservation.status === 'Confirmed' && (
            <p>Assigned Employee: {reservation.assignedEmployee}</p>
          )}
        </div>
      ) : (
        <p>No reservation found for this table.</p>
      )}
    </div>
  );
};

export default TableDetailsPage;
