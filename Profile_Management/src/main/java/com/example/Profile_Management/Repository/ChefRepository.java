package com.example.Profile_Management.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Profile_Management.Entity.Chef;

public interface ChefRepository extends JpaRepository<Chef, Long> {
}
