package com.example.Profile_Management.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Profile_Management.Entity.Manager;

public interface ManagerRepository extends JpaRepository<Manager, Long> {
}
