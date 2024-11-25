import axios from 'axios';

// Fetch all reservations
export const getAllReservations = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/reservations/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching reservations:', error);
    throw error;
  }
};

// Add a new reservation
export const addReservation = async (reservation) => {
  try {
    const response = await axios.post('http://localhost:8080/api/reservations/add', reservation);
    return response.data;
  } catch (error) {
    console.error('Error adding reservation:', error);
    throw error;
  }
};

// Update a reservation
export const updateReservation = async (id, reservation) => {
  try {
    const response = await axios.put(`http://localhost:8080/api/reservations/${id}`, reservation);
    return response.data;
  } catch (error) {
    console.error('Error updating reservation:', error);
    throw error;
  }
};

// Delete a reservation
export const deleteReservation = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8080/api/reservations/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting reservation:', error);
    throw error;
  }
};
