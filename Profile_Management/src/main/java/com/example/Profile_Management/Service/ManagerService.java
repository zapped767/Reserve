package com.example.Profile_Management.Service;

import com.example.Profile_Management.Entity.Manager;
import com.example.Profile_Management.Exception.ResourceNotFoundException;
import com.example.Profile_Management.Repository.ManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ManagerService {

    @Autowired
    private ManagerRepository managerRepository;

    public List<Manager> getAllManagers() {
        return managerRepository.findAll();
    }

    public Manager getManagerById(Long id) {
        return managerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Manager not found with id " + id));
    }

    public Manager createManager(Manager manager) {
        return managerRepository.save(manager);
    }

    public Manager updateManager(Long id, Manager managerDetails) {
        Manager manager = managerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Manager not found with id " + id));
        manager.setName(managerDetails.getName());
        manager.setPosition(managerDetails.getPosition());
        manager.setAddress(managerDetails.getAddress());
        manager.setContactNumber(managerDetails.getContactNumber());
        return managerRepository.save(manager);
    }

    public void deleteManager(Long id) {
        Manager manager = managerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Manager not found with id " + id));
        managerRepository.delete(manager);
    }
}
