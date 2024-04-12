package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import javax.websocket.server.PathParam;

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

import com.example.demo.entity.ServiceEntity;
import com.example.demo.entity.Tour;
import com.example.demo.exception.NotFoundException;
import com.example.demo.request.CreateServiceRequest;
import com.example.demo.request.CreateTourRequest;
import com.example.demo.response.MessageResponse;
import com.example.demo.service.ServiceService;

@RestController
@RequestMapping("/api/service")
@CrossOrigin(origins = "*",maxAge = 3600)
public class ServiceController {

	@Autowired
	private ServiceService serviceServices;
	
	@GetMapping("/")
	public ResponseEntity<List<ServiceEntity>> getAllService(){
		List<ServiceEntity> services = serviceServices.getListService();
		return ResponseEntity.ok(services);
	}
	
	@GetMapping("/tour/{id}")
	public ResponseEntity<List<ServiceEntity>> getAllServiceOrTourbyId(@PathVariable long id){
		List<ServiceEntity> services = serviceServices.getAllServiceById(id);
		if(services != null) {
			return ResponseEntity.ok(services);
		}else {
			return ResponseEntity.notFound().build();
		}	
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ServiceEntity> getServiceById(@PathVariable long id){
		Optional<ServiceEntity> services = serviceServices.finById(id);
	    return services.map(service -> ResponseEntity.ok(service))
	            .orElseGet(() -> ResponseEntity.notFound().build());	
	}
	
	@PostMapping("/create")
	public ResponseEntity<List<ServiceEntity>> createService(@RequestBody CreateServiceRequest body){
		System.out.print("\nbbody.toString());" + body.toString());
		List<ServiceEntity> Service = serviceServices.createService(body);
		return ResponseEntity.ok(Service);
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<List<ServiceEntity>> updateService(@PathVariable long id, @RequestBody CreateServiceRequest body){
		System.out.print("\nbbody.toString());" + body.toString());
		List<ServiceEntity> Service = serviceServices.updateService(body, id);
		return ResponseEntity.ok(Service);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteService(@PathVariable Long id){
		serviceServices.deleteService(id);
		return ResponseEntity.ok(new MessageResponse("ServiceEntity đã được xóa"));
	}
}
