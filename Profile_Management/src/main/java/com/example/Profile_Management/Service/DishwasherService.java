package com.example.Profile_Management.Service;

import com.example.Profile_Management.Entity.Dishwasher;
import com.example.Profile_Management.Exception.ResourceNotFoundException;
import com.example.Profile_Management.Repository.DishwasherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DishwasherService {

    @Autowired
    private DishwasherRepository dishwasherRepository;

    public List<Dishwasher> getAllDishwashers() {
        return dishwasherRepository.findAll();
    }

    public Dishwasher getDishwasherById(Long id) {
        return dishwasherRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Dishwasher not found with id " + id));
    }

    public Dishwasher createDishwasher(Dishwasher dishwasher) {
        return dishwasherRepository.save(dishwasher);
    }

    public Dishwasher updateDishwasher(Long id, Dishwasher dishwasherDetails) {
        Dishwasher dishwasher = dishwasherRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Dishwasher not found with id " + id));
        dishwasher.setName(dishwasherDetails.getName());
        dishwasher.setPosition(dishwasherDetails.getPosition());
        dishwasher.setAddress(dishwasherDetails.getAddress());
        dishwasher.setContactNumber(dishwasherDetails.getContactNumber());
        return dishwasherRepository.save(dishwasher);
    }

    public void deleteDishwasher(Long id) {
        Dishwasher dishwasher = dishwasherRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Dishwasher not found with id " + id));
        dishwasherRepository.delete(dishwasher);
    }
}
