package com.example.Profile_Management.Entity;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.LocalTime;

import static org.junit.jupiter.api.Assertions.*;

public class ReservationTest {

    @Test
    void testReservationConstructorAndGetters() {
        Reservation reservation = new Reservation(
                "Alice", "1234567890", 5,
                LocalDate.now(), LocalTime.of(19, 30),
                4, "Confirmed", "Employee1");

        assertEquals("Alice", reservation.getCustomerName());
        assertEquals(5, reservation.getTableNumber());
        assertEquals("Confirmed", reservation.getStatus());
    }
}
