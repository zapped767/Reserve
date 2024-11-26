package com.example.Profile_Management.Repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.awt.*;
import java.util.Optional;

@Repository
public interface MenuItemRepository extends JpaRepository<com.example.Profile_Management.Entity.MenuItem, Long> {
    Optional<MenuItem> findByName(String burger);
}

