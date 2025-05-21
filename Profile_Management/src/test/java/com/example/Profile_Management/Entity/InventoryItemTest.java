package com.example.Profile_Management.Entity;


import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class InventoryItemTest {

    @Test
    public void testInventoryItemSettersAndGetters() {
        InventoryItem item = new InventoryItem();
        item.setId(1L);
        item.setName("Item A");
        item.setDescription("Stock item A");
        item.setQuantity(50);
        item.setPrice(25.0);

        assertEquals(1L, item.getId());
        assertEquals("Item A", item.getName());
        assertEquals("Stock item A", item.getDescription());
        assertEquals(50, item.getQuantity());
        assertEquals(25.0, item.getPrice());
    }

    @Test
    public void testInventoryItemConstructorWithoutDescription() {
        InventoryItem item = new InventoryItem(2L, "Item B", 100, 15.0);

        assertEquals(2L, item.getId());
        assertEquals("Item B", item.getName());
        assertEquals(100, item.getQuantity());
        assertEquals(15.0, item.getPrice());
        assertEquals("", item.getDescription());
    }
}
