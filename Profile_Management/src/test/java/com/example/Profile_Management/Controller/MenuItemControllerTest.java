package com.example.Profile_Management.Controller;

import com.example.Profile_Management.Control.MenuItemController;
import com.example.Profile_Management.Entity.MenuItem;
import com.example.Profile_Management.Service.MenuItemService;
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

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(MenuItemController.class)
class MenuItemControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MenuItemService menuItemService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testGetAllMenuItems() throws Exception {
        List<MenuItem> menuItems = Arrays.asList(
                new MenuItem(1L, "Pizza", 12.99, "Delicious cheese pizza"),
                new MenuItem(2L, "Burger", 8.99, "Beef burger with fries")
        );

        Mockito.when(menuItemService.getAllMenuItems()).thenReturn(menuItems);

        mockMvc.perform(get("/api/menu/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()", is(2)))
                .andExpect(jsonPath("$[0].name", is("Pizza")));
    }

    @Test
    void testAddMenuItem() throws Exception {
        MenuItem newItem = new MenuItem(null, "Pasta", 10.99, "Creamy Alfredo Pasta");
        MenuItem savedItem = new MenuItem(3L, "Pasta", 10.99, "Creamy Alfredo Pasta");

        Mockito.when(menuItemService.addMenuItem(any())).thenReturn(savedItem);

        mockMvc.perform(post("/api/menu/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newItem)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", is(3)))
                .andExpect(jsonPath("$.name", is("Pasta")));
    }

    @Test
    void testUpdateMenuItemSuccess() throws Exception {
        MenuItem updatedItem = new MenuItem(1L, "Updated Pizza", 13.99, "Updated Description");

        Mockito.when(menuItemService.updateMenuItem(eq(1L), any())).thenReturn(updatedItem);

        mockMvc.perform(put("/api/menu/update/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedItem)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("Updated Pizza")));
    }

    @Test
    void testUpdateMenuItemNotFound() throws Exception {
        Mockito.when(menuItemService.updateMenuItem(eq(100L), any())).thenReturn(null);

        mockMvc.perform(put("/api/menu/update/100")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new MenuItem())))
                .andExpect(status().isNotFound());
    }

    @Test
    void testDeleteMenuItemSuccess() throws Exception {
        Mockito.when(menuItemService.deleteMenuItem(1L)).thenReturn(true);

        mockMvc.perform(delete("/api/menu/delete/1"))
                .andExpect(status().isNoContent());
    }

    @Test
    void testDeleteMenuItemNotFound() throws Exception {
        Mockito.when(menuItemService.deleteMenuItem(999L)).thenReturn(false);

        mockMvc.perform(delete("/api/menu/delete/999"))
                .andExpect(status().isNotFound());
    }
}
