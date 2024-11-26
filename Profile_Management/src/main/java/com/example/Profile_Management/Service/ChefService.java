package com.example.Profile_Management.Service;

import com.example.Profile_Management.Entity.Chef;
import com.example.Profile_Management.Exception.ResourceNotFoundException;
import com.example.Profile_Management.Repository.ChefRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChefService {

    @Autowired
    private ChefRepository chefRepository;

    public List<Chef> getAllChefs() {
        return chefRepository.findAll();
    }

    public Chef getChefById(Long id) {
        return chefRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Chef not found with id " + id));
    }

    public Chef createChef(Chef chef) {
        return chefRepository.save(chef);
    }

    public Chef updateChef(Long id, Chef chefDetails) {
        Chef chef = chefRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Chef not found with id " + id));
        chef.setName(chefDetails.getName());
        chef.setPosition(chefDetails.getPosition());
        chef.setAddress(chefDetails.getAddress());
        chef.setContactNumber(chefDetails.getContactNumber());
        return chefRepository.save(chef);
    }

    public void deleteChef(Long id) {
        Chef chef = chefRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Chef not found with id " + id));
        chefRepository.delete(chef);
    }
}
