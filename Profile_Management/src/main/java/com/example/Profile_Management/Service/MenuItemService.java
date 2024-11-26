package com.example.Profile_Management.Service;

import com.example.Profile_Management.Entity.MenuItem;
import com.example.Profile_Management.Repository.MenuItemRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
@Data
@Service
public class MenuItemService {
    @Autowired
    private MenuItemRepository menuItemRepository;

    public List<MenuItem> getAllMenuItems() {
        return menuItemRepository.findAll();
    }

    public MenuItem addMenuItem(MenuItem menuItem) {
        return menuItemRepository.save(menuItem);
    }
    public MenuItem updateMenuItem(Long id, MenuItem menuItem) {
        // Check if the menu item exists
        if (!menuItemRepository.existsById(id)) {
            return null; // Return null if item does not exist
        }
        menuItem.setId(id); // Set the id for the menu item (it will be updated)
        return menuItemRepository.save(menuItem); // Save the updated item
    }
    public boolean deleteMenuItem(Long id) {
        // Check if the item exists
        if (!menuItemRepository.existsById(id)) {
            return false; // Return false if item doesn't exist
        }

        menuItemRepository.deleteById(id); // Delete the item
        return true; // Return true if deletion is successful
    }



}

