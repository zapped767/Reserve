package com.example.Profile_Management.Controller;


import com.example.Profile_Management.Control.ManagerController;
import com.example.Profile_Management.Entity.Manager;
import com.example.Profile_Management.Service.ManagerService;
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

@WebMvcTest(ManagerController.class)
public class ManagerControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ManagerService managerService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testCreateManager() throws Exception {
        Manager managerInput = new Manager(1L, "Rachel", "Operations");
        Manager managerSaved = new Manager(1L, "Rachel", "Operations");

        Mockito.when(managerService.createManager(Mockito.any(Manager.class)))
                .thenReturn(managerSaved);

        mockMvc.perform(post("/api/managers/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(managerInput)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("Rachel")))
                .andExpect(jsonPath("$.department", is("Operations")));

        verify(managerService, times(1)).createManager(Mockito.any(Manager.class));
    }

    @Test
    public void testUpdateManager() throws Exception {
        Long id = 1L;
        Manager updatedManager = new Manager(id, "Rachel", "HR");

        Mockito.when(managerService.updateManager(Mockito.eq(id), Mockito.any(Manager.class)))
                .thenReturn(updatedManager);

        mockMvc.perform(put("/api/managers/{id}", id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedManager)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("Rachel")))
                .andExpect(jsonPath("$.department", is("HR")));

        verify(managerService, times(1)).updateManager(Mockito.eq(id), Mockito.any(Manager.class));
    }

    @Test
    public void testDeleteManager() throws Exception {
        Long id = 1L;

        mockMvc.perform(delete("/api/managers/{id}", id))
                .andExpect(status().isOk());

        verify(managerService, times(1)).deleteManager(id);
    }

    @Test
    public void testGetManagerById() throws Exception {
        Long id = 1L;
        Manager manager = new Manager(id, "Rachel", "Operations");

        Mockito.when(managerService.getManagerById(id)).thenReturn(manager);

        mockMvc.perform(get("/api/managers/{id}", id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("Rachel")))
                .andExpect(jsonPath("$.department", is("Operations")));

        verify(managerService, times(1)).getManagerById(id);
    }

    @Test
    public void testGetAllManagers() throws Exception {
        List<Manager> managers = Arrays.asList(
                new Manager(1L, "Rachel", "Operations"),
                new Manager(2L, "Tom", "Finance")
        );

        Mockito.when(managerService.getAllManagers()).thenReturn(managers);

        mockMvc.perform(get("/api/managers/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].name", is("Rachel")))
                .andExpect(jsonPath("$[1].name", is("Tom")));

        verify(managerService, times(1)).getAllManagers();
    }
}
