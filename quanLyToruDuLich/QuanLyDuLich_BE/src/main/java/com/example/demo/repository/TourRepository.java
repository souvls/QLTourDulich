package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.DTO.DailyIncomeDTO;
import com.example.demo.DTO.MonthlyIncomeDTO;
import com.example.demo.entity.Tour;

@Repository
public interface TourRepository extends JpaRepository<Tour, Long>{

    @Query(value = "Select * from tour order by id desc limit :number",nativeQuery = true)
    List<Tour> getListNewest(int number); //lấy số tour mới  
	
    List<Tour> findByName(String name);
    
    List<Tour> findByPrice(Long price);// tìm theo giá
    
    Optional<Tour> findById(Long id);
       
    @Query(value = "SELECT t.* FROM tour t\r\n"
    		+ "JOIN bookings_tours bt  ON bt.tours_id = t.id\r\n"
    		+ "JOIN bookings b ON b.id = bt.bookings_id\r\n"
    		+ "JOIN user u ON b.user_id = u.id\r\n"
    		+ "WHERE u.username like %:name% and t.id = :id",nativeQuery = true)
    Tour findListTourByIdAndUserUsername(int id, String name); //find list tour đã đặt của bảng user theo trường username;
    
    @Query(value = "SELECT * FROM tour WHERE destinations_id = :id",nativeQuery = true)
    List<Tour> findTourByIdDestinations(Long id);
    
    
    @Query(value = "Select * SELECT sum(t.price) FROM tour t \r\n"
    		+ "join bookings_tours bt on t.id = bt.tours_id\r\n"
    		+ "join bookings b on bt.tours_id = b.id\r\n"
    		+ "",nativeQuery = true)
    Long sumPriceAll(); 
    
    //thu nhập hàng ngày
    @Query(value = "SELECT DAY(bt.booking_date) AS dayOfMonth, SUM(t.price) AS dailyIncome\r\n"
    		+ "FROM tour t \r\n"
    		+ "JOIN bookings_tours bt ON t.id = bt.tours_id\r\n"
    		+ "JOIN bookings b ON bt.tours_id = b.id\r\n"
    		+ "WHERE YEAR(bt.booking_date) = :nam AND MONTH(bt.booking_date) = :thang\r\n"
    		+ "GROUP BY DAY(bt.booking_date);",nativeQuery = true)
    List<DailyIncomeDTO> sumPriceOfDay(Long thang, Long nam); 
    
    //thu nhập hàng tháng
    @Query(value = "SELECT MONTH(bt.booking_date) AS monthOfYear, SUM(t.price) AS monthlyIncome " +
            "FROM tour t " +
            "JOIN bookings_tours bt ON t.id = bt.tours_id " +
            "JOIN bookings b ON bt.tours_id = b.id " +
            "WHERE YEAR(bt.booking_date) = :nam " +
            "GROUP BY MONTH(bt.booking_date)",
    nativeQuery = true)
    List<MonthlyIncomeDTO> sumPriceOfMonth(Long nam);

}
