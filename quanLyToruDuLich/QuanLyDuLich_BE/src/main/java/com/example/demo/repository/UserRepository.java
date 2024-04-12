package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Tour;
import com.example.demo.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    
    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
    
    @Query(value = "SELECT * FROM user where verification_code LIKE %:keyword% ",nativeQuery = true)
    List<User> getListUserByVerificationCode(String keyword); 
    
    @Query(value = "SELECT COUNT(*) FROM user;",nativeQuery = true)
    Long countUser(); 
    
    @Query(value = "SELECT SUM(u.enabled) FROM user u",nativeQuery = true)
    Long sumEnabledValues();
}
