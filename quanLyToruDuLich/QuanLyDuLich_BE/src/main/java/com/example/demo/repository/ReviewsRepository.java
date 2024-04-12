package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Reviews;
import com.example.demo.entity.ServiceEntity;

@Repository
public interface ReviewsRepository extends JpaRepository<Reviews, Long>{

    @Query(value = "SELECT * FROM reviews s WHERE s.tour_id = :id",nativeQuery = true)
    List<Reviews> findAllByIdTour(Long id);
}
