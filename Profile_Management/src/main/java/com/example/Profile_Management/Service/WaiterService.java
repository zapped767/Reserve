package com.example.Profile_Management.Service;

import com.example.Profile_Management.Entity.Waiter;
import com.example.Profile_Management.Exception.ResourceNotFoundException;
import com.example.Profile_Management.Repository.WaiterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WaiterService {

    @Autowired
    private WaiterRepository waiterRepository;

    public List<Waiter> getAllWaiters() {
        return waiterRepository.findAll();
    }

    public Waiter getWaiterById(Long id) {
        return waiterRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Waiter not found with id " + id));
    }

    public Waiter createWaiter(Waiter waiter) {
        return waiterRepository.save(waiter);
    }

    public Waiter updateWaiter(Long id, Waiter waiterDetails) {
        Waiter waiter = waiterRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Waiter not found with id " + id));
        waiter.setName(waiterDetails.getName());
        waiter.setPosition(waiterDetails.getPosition());
        waiter.setAddress(waiterDetails.getAddress());
        waiter.setContactNumber(waiterDetails.getContactNumber());
        return waiterRepository.save(waiter);
    }

    public void deleteWaiter(Long id) {
        Waiter waiter = waiterRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Waiter not found with id " + id));
        waiterRepository.delete(waiter);
    }
}
