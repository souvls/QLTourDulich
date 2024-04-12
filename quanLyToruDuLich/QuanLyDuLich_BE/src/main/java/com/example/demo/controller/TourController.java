package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.DailyIncomeDTO;
import com.example.demo.DTO.MonthlyIncomeDTO;
import com.example.demo.entity.Tour;
import com.example.demo.request.CreateTourRequest;
import com.example.demo.response.MessageResponse;
import com.example.demo.service.TourService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/tour")
@CrossOrigin(origins = "*",maxAge = 3600)
public class TourController {

	@Autowired
	private TourService tourservice;
	
	@GetMapping("/")
	public ResponseEntity<List<Tour>> getAllTour(){
		List<Tour> Tours = tourservice.getListTour();
		return ResponseEntity.ok(Tours);
	}
	
	@GetMapping("/search/name")
	public ResponseEntity<List<Tour>> FinAllTourByName(@RequestParam("keywork") String keywork){
		List<Tour> Tours = tourservice.getListTourByName(keywork);
		return ResponseEntity.ok(Tours);
	}


	@GetMapping("/search/price")
	public ResponseEntity<List<Tour>> FinAllTourByPrice(@RequestParam("keywork") Long keywork){
		List<Tour> Tours = tourservice.getListTourByPrice(keywork);
		return ResponseEntity.ok(Tours);
	}
	
	@GetMapping("/tourdetail")
	public ResponseEntity<Tour> findTourByPrice(@RequestParam("id") long id){
	    Optional<Tour> tourOptional = tourservice.getTourById(id);
	    return tourOptional.map(tour -> ResponseEntity.ok(tour))
	            .orElseGet(() -> ResponseEntity.notFound().build());
	}
	
	@GetMapping("/destinations")
	public ResponseEntity<List<Tour>> findTourByIdDestinations(@RequestParam("id") long id){
		List<Tour> Tours = tourservice.findTourByIdDestinations(id);
		return ResponseEntity.ok(Tours);
	}
	
	@PostMapping("/create")
	public ResponseEntity<Tour> createTour(@RequestBody CreateTourRequest body){
		Tour Tours = tourservice.createTour(body);
		return ResponseEntity.ok(Tours);
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<Tour> updateTour(@RequestBody CreateTourRequest body,@PathVariable long id){
		Tour Tours = tourservice.updateTour(body, id);
		return ResponseEntity.ok(Tours);
	}
	
	@DeleteMapping("/delete")
	public ResponseEntity<?> deleteTour(@RequestParam("id") Long id){
		tourservice.deleteTour(id);
		return ResponseEntity.ok(new MessageResponse("tour đã được xóa"));
	}
	
	@GetMapping("/count")
    @Operation(summary="Thống kê tour du lịch")
	public ResponseEntity<Long> countDestinations(){
		Long count = tourservice.count();
		return ResponseEntity.ok(count);
	}
	
	
	@GetMapping("/statistics")
    @Operation(summary="Thống kê")
	public ResponseEntity<Long> sumAllPrice(){
		Long count = tourservice.sumAllPrice();
		return ResponseEntity.ok(count);
	}
	
	
    @GetMapping("/statistics-day")
    public ResponseEntity<List<DailyIncomeDTO>> getDailyIncomeByMonthAndYear(
            @RequestParam("month") Long month,
            @RequestParam("year") Long year
    ) {
        List<DailyIncomeDTO> dailyIncomeList = tourservice.sumPriceOfDay(month, year);
        return ResponseEntity.ok(dailyIncomeList);
    }
    
    @GetMapping("/statistics-year")
    public ResponseEntity<List<MonthlyIncomeDTO>> getDailyIncomeByMonthAndYear(
            @RequestParam("year") Long year
    ) {
        List<MonthlyIncomeDTO> dailyIncomeList = tourservice.sumPriceOfMonth(year);
        return ResponseEntity.ok(dailyIncomeList);
    }
}
