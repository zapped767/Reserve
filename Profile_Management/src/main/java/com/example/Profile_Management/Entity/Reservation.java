package com.example.Profile_Management.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@NoArgsConstructor
@Table(name="Reservation")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private String contactNumber;
    private int tableNumber;
    private LocalDate reservationDate;
    private LocalTime reservationTime;
    private int numberOfGuests;
    private String status;  // Example: "Pending", "Confirmed", "Cancelled"
    private String assignedEmployee;

    public Reservation(long l, String john, LocalDate now, String dinner) {
    }

    public Reservation(String alice, String number, int i, LocalDate now, LocalTime of, int i1, String confirmed, String employee1) {
    }
}
