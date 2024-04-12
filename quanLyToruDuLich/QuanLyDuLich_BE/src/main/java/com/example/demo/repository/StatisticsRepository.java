package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Reviews;
import com.example.demo.entity.Statistics;

@Repository
public interface StatisticsRepository extends JpaRepository<Statistics,Long>{

}
