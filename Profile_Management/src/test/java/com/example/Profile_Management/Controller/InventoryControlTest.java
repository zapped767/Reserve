package com.example.Profile_Management.Controller;


import com.example.Profile_Management.Control.InventoryControl;
import com.example.Profile_Management.Entity.InventoryItem;
import com.example.Profile_Management.Service.InventoryService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(InventoryControl.class)
class InventoryControlTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private InventoryService inventoryService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testGetAllItems() throws Exception {
        List<InventoryItem> itemList = Arrays.asList(
                new InventoryItem(1L, "Item A", 5, 100.0),
                new InventoryItem(2L, "Item B", 10, 50.0)
        );

        Mockito.when(inventoryService.getAllItems()).thenReturn(itemList);

        mockMvc.perform(get("/api/inventory/items"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    void testGetItemById() throws Exception {
        InventoryItem item = new InventoryItem(1L, "Item A", 5, 100.0);

        Mockito.when(inventoryService.getItemById(1L)).thenReturn(item);

        mockMvc.perform(get("/api/inventory/items/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("Item A")));
    }

    @Test
    void testAddItem() throws Exception {
        InventoryItem item = new InventoryItem(null, "Item C", 3, 30.0);
        InventoryItem savedItem = new InventoryItem(3L, "Item C", 3, 30.0);

        Mockito.when(inventoryService.addItem(Mockito.any())).thenReturn(savedItem);

        mockMvc.perform(post("/api/inventory/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(item)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", is(3)));
    }

    @Test
    void testUpdateItem() throws Exception {
        InventoryItem updated = new InventoryItem(1L, "Updated Item", 8, 80.0);

        Mockito.when(inventoryService.updateItem(Mockito.eq(1L), Mockito.any())).thenReturn(updated);

        mockMvc.perform(put("/api/inventory/items/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updated)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("Updated Item")));
    }

    @Test
    void testDeleteItem() throws Exception {
        Mockito.doNothing().when(inventoryService).deleteItem(1L);

        mockMvc.perform(delete("/api/inventory/items/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("Item deleted successfully"));
    }
}
