package com.example.Profile_Management.Service;




import com.example.Profile_Management.Entity.InventoryItem;
import com.example.Profile_Management.Repository.InventoryItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {

    @Autowired
    private InventoryItemRepository inventoryRepository;

    public List<InventoryItem> getAllItems() {
        return inventoryRepository.findAll();
    }

    public InventoryItem getItemById(Long id) {
        return inventoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found with ID: " + id));

    }

    public InventoryItem addItem(InventoryItem item) {
        return inventoryRepository.save(item);
    }

    public InventoryItem updateItem(Long id, InventoryItem inventoryItem) {
        InventoryItem item = getItemById(id);
        item.setName(inventoryItem.getName());
        item.setDescription(inventoryItem.getDescription());
        item.setQuantity(inventoryItem.getQuantity());
        item.setPrice(inventoryItem.getPrice());
        return inventoryRepository.save(item);
    }

    public void deleteItem(Long id) {
        inventoryRepository.deleteById(id);
    }

}
