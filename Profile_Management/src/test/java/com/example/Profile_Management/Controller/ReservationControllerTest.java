package com.example.Profile_Management.Controller;

import com.example.Profile_Management.Control.ReservationController;
import com.example.Profile_Management.Entity.Reservation;
import com.example.Profile_Management.Service.ReservationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ReservationController.class)
public class ReservationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ReservationService reservationService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testAddReservation() throws Exception {
        Reservation reservation = new Reservation(1L, "John", LocalDate.now(), "Dinner");

        Mockito.when(reservationService.addReservation(Mockito.any(Reservation.class)))
                .thenReturn(reservation);

        mockMvc.perform(post("/api/reservations/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(reservation)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.name", is("John")))
                .andExpect(jsonPath("$.reservationType", is("Dinner")));
    }

    @Test
    public void testGetAllReservations() throws Exception {
        List<Reservation> reservations = Arrays.asList(
                new Reservation(1L, "Alice", LocalDate.now(), "Lunch"),
                new Reservation(2L, "Bob", LocalDate.now(), "Dinner")
        );

        Mockito.when(reservationService.getAllReservations())
                .thenReturn(reservations);

        mockMvc.perform(get("/api/reservations/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].name", is("Alice")))
                .andExpect(jsonPath("$[1].name", is("Bob")));
    }

    @Test
    public void testGetReservationsByDate() throws Exception {
        LocalDate date = LocalDate.of(2025, 5, 20);
        List<Reservation> reservations = Arrays.asList(
                new Reservation(1L, "Charlie", date, "Breakfast")
        );

        Mockito.when(reservationService.getReservationsByDate(date))
                .thenReturn(reservations);

        mockMvc.perform(get("/api/reservations/date/2025-05-20"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].name", is("Charlie")));
    }

    @Test
    public void testUpdateReservation() throws Exception {
        Reservation updatedReservation = new Reservation(1L, "Updated Name", LocalDate.now(), "Updated Type");

        Mockito.when(reservationService.updateReservation(Mockito.eq(1L), Mockito.any(Reservation.class)))
                .thenReturn(updatedReservation);

        mockMvc.perform(put("/api/reservations/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedReservation)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("Updated Name")))
                .andExpect(jsonPath("$.reservationType", is("Updated Type")));
    }

    @Test
    public void testDeleteReservation() throws Exception {
        Mockito.doNothing().when(reservationService).deleteReservation(1L);

        mockMvc.perform(delete("/api/reservations/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("Reservation with ID 1 deleted successfully."));
    }
}