package com.example.Profile_Management.Service;


import com.example.Profile_Management.Entity.Reservation;
import com.example.Profile_Management.Repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public Reservation addReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public List<Reservation> getReservationsByDate(LocalDate date) {
        return reservationRepository.findByReservationDate(date);
    }

    public Reservation updateReservation(Long id, Reservation updatedReservation) {
        return reservationRepository.findById(id)
                .map(reservation -> {
                    reservation.setCustomerName(updatedReservation.getCustomerName());
                    reservation.setContactNumber(updatedReservation.getContactNumber());
                    reservation.setTableNumber(updatedReservation.getTableNumber());
                    reservation.setReservationDate(updatedReservation.getReservationDate());
                    reservation.setReservationTime(updatedReservation.getReservationTime());
                    reservation.setNumberOfGuests(updatedReservation.getNumberOfGuests());
                    reservation.setStatus(updatedReservation.getStatus());
                    return reservationRepository.save(reservation);
                })
                .orElseThrow(() -> new RuntimeException("Reservation not found"));
    }

    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);
    }
}

