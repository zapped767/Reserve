package com.example.Profile_Management.Repository;




import com.example.Profile_Management.Entity.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryItemRepository extends JpaRepository<InventoryItem,Long> {
}
