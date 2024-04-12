package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Bookings;

import java.util.List;

@Repository
public interface BookingsRepository extends JpaRepository<Bookings, Long>{

    List<Bookings> findAllByUserId(long userId);

}
