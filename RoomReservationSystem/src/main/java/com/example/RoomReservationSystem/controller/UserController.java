package com.example.RoomReservationSystem.controller;

import com.example.RoomReservationSystem.Entity.UserEntity;
import com.example.RoomReservationSystem.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public List<UserEntity> getAllRooms() {
        return userService.getAllRooms();
    }

    @PostMapping
    public UserEntity createRoom(@RequestBody UserEntity room) {
        return userService.createRoom(room);
    }

    @PutMapping("/{id}")
    public UserEntity updateRoom(@PathVariable Long id, @RequestBody UserEntity room) {
        return userService.updateRoom(id, room);
    }

    @DeleteMapping("/{id}")
    public String deleteRoom(@PathVariable Long id) {
        userService.deleteRoom(id);
        return "Room with ID " + id + " deleted successfully";
    }
}
