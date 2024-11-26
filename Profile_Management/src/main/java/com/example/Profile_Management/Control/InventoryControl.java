package com.example.Profile_Management.Control;





import com.example.Profile_Management.Entity.InventoryItem;
import com.example.Profile_Management.Service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin("*")
public class InventoryControl {
    @Autowired
    private InventoryService inventoryService;

    @GetMapping("/items")
    public ResponseEntity<List<InventoryItem>> getAllItems() {
        List<InventoryItem> items = inventoryService.getAllItems();
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @GetMapping("/items/{id}")
    public ResponseEntity<InventoryItem> getItemById(@PathVariable Long id) {
        try {
            InventoryItem item = inventoryService.getItemById(id);
            return new ResponseEntity<>(item, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<InventoryItem> addItem(@RequestBody InventoryItem item) {
        InventoryItem newItem = inventoryService.addItem(item);
        return new ResponseEntity<>(newItem, HttpStatus.CREATED);
    }
    @PutMapping("/items/{id}")
    public ResponseEntity<InventoryItem> updateItem(@PathVariable Long id, @RequestBody InventoryItem updatedItem) {
        try {
            InventoryItem item = inventoryService.updateItem(id, updatedItem);
            return new ResponseEntity<>(item, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/items/{id}")
    public ResponseEntity<String> deleteItem(@PathVariable Long id) {
        try {
            inventoryService.deleteItem(id);
            return new ResponseEntity<>("Item deleted successfully", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>("Item not found", HttpStatus.NOT_FOUND);
        }
    }



}

