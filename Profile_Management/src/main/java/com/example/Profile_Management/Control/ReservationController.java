package com.example.Profile_Management.Control;

import com.example.Profile_Management.Entity.Reservation;
import com.example.Profile_Management.Service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/reservations")

public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @PostMapping("/add")
    public Reservation addReservation(@RequestBody Reservation reservation) {
        return reservationService.addReservation(reservation);
    }

    @GetMapping("/all")
    public List<Reservation> getAllReservations() {
        return reservationService.getAllReservations();
    }

    @GetMapping("/date/{date}")
    public List<Reservation> getReservationsByDate(@PathVariable String date) {
        return reservationService.getReservationsByDate(LocalDate.parse(date));
    }

    @PutMapping("/{id}")
    public Reservation updateReservation(@PathVariable Long id, @RequestBody Reservation reservation) {
        return reservationService.updateReservation(id, reservation);
    }

    @DeleteMapping("/{id}")
    public String deleteReservation(@PathVariable Long id) {
        reservationService.deleteReservation(id);
        return "Reservation with ID " + id + " deleted successfully.";
    }
}
