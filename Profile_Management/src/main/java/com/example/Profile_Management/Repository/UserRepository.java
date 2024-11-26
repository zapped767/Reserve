package com.example.Profile_Management.Repository;

import com.example.Profile_Management.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
