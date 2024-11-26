package com.example.Profile_Management.Control;




import com.example.Profile_Management.Entity.MenuItem;
import com.example.Profile_Management.Service.MenuItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin("*")
public class MenuItemController {

    @Autowired
    private MenuItemService menuItemService;

    @GetMapping("/all")
    public List<MenuItem> getAllMenuItems() {
        return menuItemService.getAllMenuItems();
    }

    @PostMapping("/add")
    public ResponseEntity<MenuItem> addMenuItem(@RequestBody MenuItem menuItem) {
        MenuItem savedItem = menuItemService.addMenuItem(menuItem);
        return new ResponseEntity<>(savedItem, HttpStatus.CREATED);
    }

    // PUT method to update an existing menu item
    @PutMapping("/update/{id}")
    public ResponseEntity<MenuItem> updateMenuItem(@PathVariable Long id, @RequestBody MenuItem menuItem) {
        MenuItem updatedMenuItem = menuItemService.updateMenuItem(id, menuItem);
        if (updatedMenuItem == null) {
            return ResponseEntity.notFound().build(); // If item not found, return 404
        }
        return ResponseEntity.ok(updatedMenuItem); // Return the updated item with 200 status
    }

    // DELETE method to delete a menu item
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable Long id) {
        boolean isDeleted = menuItemService.deleteMenuItem(id);
        if (!isDeleted) {
            return ResponseEntity.notFound().build(); // If item not found, return 404
        }
        return ResponseEntity.noContent().build(); // Return 204 status for successful deletion
    }
}
