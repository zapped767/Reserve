package com.example.Profile_Management.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Profile_Management.Entity.Dishwasher;

public interface DishwasherRepository extends JpaRepository<Dishwasher, Long> {
}
