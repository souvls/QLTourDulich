package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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

import com.example.demo.entity.Destinations;
import com.example.demo.entity.Tour;
import com.example.demo.request.CreateDestinationsRequest;
import com.example.demo.request.CreateTourRequest;
import com.example.demo.response.MessageResponse;
import com.example.demo.service.DestinationsService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/destinations")
@CrossOrigin(origins = "*",maxAge = 3600)
public class DestinationsController {

	@Autowired
	private DestinationsService destinationservice;
	
	@GetMapping("/hot")
	public ResponseEntity<List<Destinations>> getListDestinationsHot(){
		List<Destinations> destination = destinationservice.getListDestinationsHot();
		return ResponseEntity.ok(destination);
	}
	
	@GetMapping("/")
	public ResponseEntity<List<Destinations>> getListDestinations(){
		List<Destinations> destination = destinationservice.getListDestinations();
		return ResponseEntity.ok(destination);
	}
	
	
	@GetMapping("search/destination")
    @Operation(summary="Tìm kiếm địa điểm bằng keyword")
	public ResponseEntity<List<Destinations>> getListDestinationsByKeyWork(@RequestParam("keyword") String keyword){
		List<Destinations> destination = destinationservice.findDestinationsByKeyword(keyword);
		return ResponseEntity.ok(destination);
	}
	
	
	@PostMapping("/create")
	public ResponseEntity<Destinations> createDestination(@RequestBody CreateDestinationsRequest body){
		Destinations Destination = destinationservice.createDestination(body);
		return ResponseEntity.ok(Destination);
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<Destinations> updateDestination(@RequestBody CreateDestinationsRequest body,@PathVariable long id){
		Destinations Destination = destinationservice.updateDestination(body, id);
		return ResponseEntity.ok(Destination);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteDestination(@PathVariable Long id){
		destinationservice.deleteDestination(id);
		return ResponseEntity.ok(new MessageResponse("Destination đã được xóa"));
	}
	

	@GetMapping("/count")
    @Operation(summary="Thống kê địa điểm tour du lịch")
	public ResponseEntity<Long> countDestinations(){
		Long count = destinationservice.count();
		return ResponseEntity.ok(count);
	}
}
