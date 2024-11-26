package com.example.Profile_Management.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Profile_Management.Entity.Security;

public interface SecurityRepository extends JpaRepository<Security, Long> {
}
