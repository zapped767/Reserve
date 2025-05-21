package com.example.Profile_Management.Entity;


import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class DishwasherTest {

    @Test
    void testDishwasherSettersAndGetters() {
        Dishwasher dishwasher = new Dishwasher();
        dishwasher.setId(1L);
        dishwasher.setName("John");
        dishwasher.setPosition("Kitchen Staff");
        dishwasher.setAddress("Colombo");
        dishwasher.setContactNumber("0771234567");
        dishwasher.setShift("Night");

        assertEquals(1L, dishwasher.getId());
        assertEquals("John", dishwasher.getName());
        assertEquals("Kitchen Staff", dishwasher.getPosition());
        assertEquals("Colombo", dishwasher.getAddress());
        assertEquals("0771234567", dishwasher.getContactNumber());
        assertEquals("Night", dishwasher.getShift());
    }

    @Test
    void testDishwasherConstructorWithIdNameShift() {
        Dishwasher dishwasher = new Dishwasher(2L, "Anna", "Morning");

        assertEquals(2L, dishwasher.getId());
        assertEquals("Anna", dishwasher.getName());
        assertEquals("Morning", dishwasher.getShift());
    }
}

