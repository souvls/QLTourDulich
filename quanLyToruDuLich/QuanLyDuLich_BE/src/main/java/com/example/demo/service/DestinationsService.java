package com.example.demo.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.entity.Destinations;
import com.example.demo.entity.ServiceEntity;
import com.example.demo.entity.Tour;
import com.example.demo.request.CreateDestinationsRequest;
import com.example.demo.request.CreateTourRequest;
import com.example.demo.response.MessageResponse;

public interface DestinationsService {

	List<Destinations> getListDestinations();
	
	List<Destinations> getListDestinationsHot();
	
	List<Destinations> findDestinationsByKeyword(String keyword);
	
	List<Destinations> findDestinationsByName(String name);
	
	Destinations createDestination(CreateDestinationsRequest body);
	
	Destinations updateDestination(CreateDestinationsRequest body, Long id);
	
	void deleteDestination(Long id);
	
	Long count();
}
