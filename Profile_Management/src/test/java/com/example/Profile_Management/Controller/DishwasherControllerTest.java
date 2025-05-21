package com.example.Profile_Management.Controller;

import com.example.Profile_Management.Control.DishwasherController;
import com.example.Profile_Management.Entity.Dishwasher;
import com.example.Profile_Management.Service.DishwasherService;
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
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(DishwasherController.class)
public class DishwasherControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private DishwasherService dishwasherService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testCreateDishwasher() throws Exception {
        Dishwasher dishwasherInput = new Dishwasher(1L, "Anna", "Morning");
        Dishwasher dishwasherSaved = new Dishwasher(1L, "Anna", "Morning");

        Mockito.when(dishwasherService.createDishwasher(Mockito.any(Dishwasher.class)))
                .thenReturn(dishwasherSaved);

        mockMvc.perform(post("/api/dishwashers/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dishwasherInput)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("Anna")))
                .andExpect(jsonPath("$.shift", is("Morning")));

        verify(dishwasherService, times(1)).createDishwasher(Mockito.any(Dishwasher.class));
    }

    @Test
    public void testUpdateDishwasher() throws Exception {
        Long id = 1L;
        Dishwasher updatedDishwasher = new Dishwasher(id, "Anna", "Evening");

        Mockito.when(dishwasherService.updateDishwasher(Mockito.eq(id), Mockito.any(Dishwasher.class)))
                .thenReturn(updatedDishwasher);

        mockMvc.perform(put("/api/dishwashers/{id}", id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedDishwasher)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("Anna")))
                .andExpect(jsonPath("$.shift", is("Evening")));

        verify(dishwasherService, times(1)).updateDishwasher(Mockito.eq(id), Mockito.any(Dishwasher.class));
    }

    @Test
    public void testDeleteDishwasher() throws Exception {
        Long id = 1L;

        mockMvc.perform(delete("/api/dishwashers/{id}", id))
                .andExpect(status().isOk());

        verify(dishwasherService, times(1)).deleteDishwasher(id);
    }

    @Test
    public void testGetDishwasherById() throws Exception {
        Long id = 1L;
        Dishwasher dishwasher = new Dishwasher(id, "Anna", "Morning");

        Mockito.when(dishwasherService.getDishwasherById(id)).thenReturn(dishwasher);

        mockMvc.perform(get("/api/dishwashers/{id}", id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("Anna")))
                .andExpect(jsonPath("$.shift", is("Morning")));

        verify(dishwasherService, times(1)).getDishwasherById(id);
    }

    @Test
    public void testGetAllDishwashers() throws Exception {
        List<Dishwasher> dishwashers = Arrays.asList(
                new Dishwasher(1L, "Anna", "Morning"),
                new Dishwasher(2L, "John", "Evening")
        );

        Mockito.when(dishwasherService.getAllDishwashers()).thenReturn(dishwashers);

        mockMvc.perform(get("/api/dishwashers/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].name", is("Anna")))
                .andExpect(jsonPath("$[1].name", is("John")));

        verify(dishwasherService, times(1)).getAllDishwashers();
    }
}
