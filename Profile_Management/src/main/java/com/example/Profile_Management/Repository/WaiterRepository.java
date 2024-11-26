package com.example.Profile_Management.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Profile_Management.Entity.Waiter;

public interface WaiterRepository extends JpaRepository<Waiter, Long> {
}
