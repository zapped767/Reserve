package com.example.RoomReservationSystem.Service;

import com.example.RoomReservationSystem.Entity.UserEntity;
import com.example.RoomReservationSystem.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository UserRepository;

    // Retrieve all rooms
    public List<UserEntity> getAllRooms() {
        return UserRepository.findAll(); // findAll() method from JpaRepository
    }

    // Create a room
    public UserEntity createRoom(UserEntity room) {
        return UserRepository.save(room); // save() method from JpaRepository
    }

    // Update a room
    public UserEntity updateRoom(Long id, UserEntity updatedRoom) {
        return UserRepository.findById(id) // findById() method from JpaRepository
                .map(room -> {
                    room.setName(updatedRoom.getName());
                    room.setCapacity(updatedRoom.getCapacity());
                    room.setAvailable(updatedRoom.isAvailable());
                    return UserRepository.save(room); // save() to update the room
                })
                .orElseThrow(() -> new RuntimeException("Room not found with id " + id));
    }

    // Delete a room
    public void deleteRoom(Long id) {
        UserRepository.deleteById(id); // deleteById() method from JpaRepository
    }
}
