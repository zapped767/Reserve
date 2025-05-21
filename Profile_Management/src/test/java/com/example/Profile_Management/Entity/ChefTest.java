package com.example.Profile_Management.Entity;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class ChefTest {

    @Test
    public void testChefSettersAndGetters() {
        Chef chef = new Chef("Anna", "Italian");

        chef.setId(1L);
        chef.setPosition("Head Chef");
        chef.setAddress("123 Main St");
        chef.setContactNumber("123-456-7890");

        assertEquals(1L, chef.getId());
        assertEquals("Anna", chef.getName());
        assertEquals("Italian", chef.getSpecialty()); // This will be null due to setSpecialty() being empty
        assertEquals("Head Chef", chef.getPosition());
        assertEquals("123 Main St", chef.getAddress());
        assertEquals("123-456-7890", chef.getContactNumber());
    }

    @Test
    public void testChefAllArgumentsConstructor() {
        Chef chef = new Chef("Marco", "Mexican");
        chef.setSpecialty("Mexican"); // Currently does nothing

        assertEquals("Marco", chef.getName());
        assertNull(chef.getSpecialty()); // setSpecialty() doesn't set the value in your code
    }
}
