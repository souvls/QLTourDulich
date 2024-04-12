package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import com.example.demo.DTO.DailyIncomeDTO;
import com.example.demo.DTO.MonthlyIncomeDTO;
import com.example.demo.entity.Tour;
import com.example.demo.request.CreateTourRequest;

public interface TourService {

	List<Tour> getListTour();
	
	List<Tour> getListTourByName(String name);
	
	List<Tour> getListTourByPrice(long price);
	
	Optional<Tour> getTourById(long id);
	
	Tour findListTourByIdAndUserUsername(int id, String name);
	
	List<Tour> findTourByIdDestinations(Long id);
	
	Tour createTour(CreateTourRequest body);
	
	Tour updateTour(CreateTourRequest body, Long id);
	
	void deleteTour(Long id);
	
	Long count();
	
	Long sumAllPrice();
	
    List<DailyIncomeDTO> sumPriceOfDay(Long thang, Long nam); 
    
    List<MonthlyIncomeDTO> sumPriceOfMonth(Long nam); 
}
