package com.example.Profile_Management.Controller;

import com.example.Profile_Management.Control.ChefController;
import com.example.Profile_Management.Entity.Chef;
import com.example.Profile_Management.Service.ChefService;
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

@WebMvcTest(ChefController.class)
class ChefControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ChefService chefService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testGetAllChefs() throws Exception {
        List<Chef> chefs = Arrays.asList(
                new Chef(1L, "Chef Anna", "Italian"),
                new Chef(2L, "Chef Bob", "Chinese")
        );

        Mockito.when(chefService.getAllChefs()).thenReturn(chefs);

        mockMvc.perform(get("/api/chefs/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()", is(2)))
                .andExpect(jsonPath("$[0].name", is("Chef Anna")));
    }

    @Test
    void testGetChefById() throws Exception {
        Chef chef = new Chef(1L, "Chef Anna", "Italian");

        Mockito.when(chefService.getChefById(1L)).thenReturn(chef);

        mockMvc.perform(get("/api/chefs/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("Chef Anna")));
    }

    @Test
    void testCreateChef() throws Exception {
        Chef newChef = new Chef("Chef Clara", "Mexican");

        Chef savedChef = new Chef(3L, "Chef Clara", "Mexican");

        Mockito.when(chefService.createChef(any())).thenReturn(savedChef);

        mockMvc.perform(post("/api/chefs/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newChef)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(3)))
                .andExpect(jsonPath("$.name", is("Chef Clara")))
                .andExpect(jsonPath("$.specialty", is("Mexican")));
    }


    @Test
    void testUpdateChef() throws Exception {
        Chef updatedChef = new Chef(1L, "Chef Anna Updated", "Fusion");

        Mockito.when(chefService.updateChef(eq(1L), any())).thenReturn(updatedChef);

        mockMvc.perform(put("/api/chefs/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedChef)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("Chef Anna Updated")));
    }

    @Test
    void testDeleteChef() throws Exception {
        Mockito.doNothing().when(chefService).deleteChef(1L);

        mockMvc.perform(delete("/api/chefs/1"))
                .andExpect(status().isOk());
    }
}
