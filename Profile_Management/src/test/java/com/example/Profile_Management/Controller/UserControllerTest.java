package com.example.Profile_Management.Controller;

import com.example.Profile_Management.Control.UserController;
import com.example.Profile_Management.Entity.User;
import com.example.Profile_Management.Service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.hasSize;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;


import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testCreateUser() throws Exception {
        User inputUser = new User(1L, "john_doe", "John", "Doe", "john@example.com");
        User savedUser = new User(1L, "john_doe", "John", "Doe", "john@example.com");

        when(userService.createUser(any(User.class))).thenReturn(savedUser);

        mockMvc.perform(post("/api/users/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(inputUser)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is("john_doe")))
                .andExpect(jsonPath("$.email", is("john@example.com")));

        verify(userService, times(1)).createUser(any(User.class));
    }

    @Test
    public void testUpdateUser() throws Exception {
        Long id = 1L;
        User updatedUser = new User(id, "john_doe", "John", "Smith", "johnsmith@example.com");

        when(userService.updateUser(eq(id), any(User.class))).thenReturn(updatedUser);

        mockMvc.perform(put("/api/users/{id}", id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedUser)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.lastName", is("Smith")))
                .andExpect(jsonPath("$.email", is("johnsmith@example.com")));

        verify(userService, times(1)).updateUser(eq(id), any(User.class));
    }

    @Test
    public void testDeleteUser() throws Exception {
        Long id = 1L;

        // No need to stub delete method if it returns void
        doNothing().when(userService).deleteUser(id);

        mockMvc.perform(delete("/api/users/{id}", id))
                .andExpect(status().isOk());

        verify(userService, times(1)).deleteUser(id);
    }

    @Test
    public void testGetUserById() throws Exception {
        Long id = 1L;
        User user = new User(id, "john_doe", "John", "Doe", "john@example.com");

        when(userService.getUserById(id)).thenReturn(Optional.of(user));

        mockMvc.perform(get("/api/users/{id}", id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is("john_doe")))
                .andExpect(jsonPath("$.email", is("john@example.com")));

        verify(userService, times(1)).getUserById(id);
    }

    @Test
    public void testGetAllUsers() throws Exception {
        List<User> users = Arrays.asList(
                new User(1L, "alice", "Alice", "Wonder", "alice@example.com"),
                new User(2L, "bob", "Bob", "Builder", "bob@example.com")
        );

        when(userService.getAllUsers()).thenReturn(users);

        mockMvc.perform(get("/api/users/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].username", is("alice")))
                .andExpect(jsonPath("$[1].username", is("bob")));

        verify(userService, times(1)).getAllUsers();
    }
}
