package com.example.Profile_Management.Entity;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class MenuItemTest {

    @Test
    void testMenuItemSettersAndGetters() {
        MenuItem item = new MenuItem();
        item.setId(1L);
        item.setName("Burger");
        item.setDescription("Delicious beef burger");
        item.setPrice(5.99);

        assertEquals(1L, item.getId());
        assertEquals("Burger", item.getName());
        assertEquals("Delicious beef burger", item.getDescription());
        assertEquals(5.99, item.getPrice());
    }

    @Test
    void testMenuItemConstructor() {
        MenuItem item = new MenuItem("Pizza", "Cheesy pizza", 7.49);
        assertEquals("Pizza", item.getName());
        assertEquals("Cheesy pizza", item.getDescription());
        assertEquals(7.49, item.getPrice());
    }
}
