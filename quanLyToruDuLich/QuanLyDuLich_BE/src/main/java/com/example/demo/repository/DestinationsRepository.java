package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Destinations;
import com.example.demo.entity.ServiceEntity;
import com.example.demo.entity.User;

@Repository
public interface DestinationsRepository extends JpaRepository<Destinations, Long>{

    @Query(value = "SELECT d.*\r\n"
    		+ "FROM destinations d\r\n"
    		+ "JOIN tour t ON d.id = t.destinations_id\r\n"
    		+ "JOIN reviews r ON t.id = r.tour_id\r\n"
    		+ "WHERE r.rating = 5\r\n"
    		+ "GROUP BY d.id\r\n"
    		+ "ORDER BY RAND()\r\n"
    		+ "LIMIT 4;\r\n"
    		+ "",nativeQuery = true)
    List<Destinations> getListDestinationsHot(); //lấy 4 địa điểm nổi bật dựa vô số raiting của bảng reviews
    
    
    @Query(value = "SELECT * FROM destinations l WHERE l.name LIKE %:keyword% OR l.description LIKE %:keyword%",nativeQuery = true)
    List<Destinations> findByKeyword(String keyword);   // tìm kiếm địa điểm theo tên và mô tả của địa điểm
	
    
    @Query(value = "SELECT * FROM destinations d WHERE s.tour_id = :id", nativeQuery = true)
    List<Destinations> findDestinationsByIdTour(Long id);   // tìm kiếm địa điểm theo id tour du lịch
    
    @Query(value = "SELECT * FROM destinations l WHERE l.name LIKE %:name%",nativeQuery = true)
    List<Destinations> findByName(String name);      
    
}
