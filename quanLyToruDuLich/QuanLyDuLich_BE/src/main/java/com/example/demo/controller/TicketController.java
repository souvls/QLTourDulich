package com.example.demo.controller;

import java.util.List;

import com.example.demo.entity.Bookings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Ticket;
import com.example.demo.entity.Tour;
import com.example.demo.request.CreateTicketRequest;
import com.example.demo.request.CreateTourRequest;
import com.example.demo.response.MessageResponse;
import com.example.demo.service.TicketService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/ticket")
@CrossOrigin(origins = "*",maxAge = 3600)
public class TicketController {

	@Autowired
	private TicketService ticketservice;

	@GetMapping("/{id}")
	public ResponseEntity<List<Ticket>> getListTicketByUserId(@PathVariable Long id){
		List<Ticket> Tickets = ticketservice.getListTicketByUserId(id);
		return ResponseEntity.ok(Tickets);
	}

	@GetMapping("/")
	public ResponseEntity<List<Ticket>> getAllTicket(){
		List<Ticket> Tickets = ticketservice.getListTicket();
		return ResponseEntity.ok(Tickets);
	}
	
	@PostMapping("/create")
	public ResponseEntity<?> createTicket(@RequestBody CreateTicketRequest body){
		ticketservice.createTicket(body);
		return ResponseEntity.ok(new MessageResponse("tạo ticket thành công"));
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<?> updateTicket(@RequestBody CreateTicketRequest body, @PathVariable Long id){
		ticketservice.updateTicket(body, id);
		return ResponseEntity.ok(new MessageResponse("cập nhật ticket thành công"));
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteTicket(@PathVariable Long id){
		ticketservice.deleteTicket(id);
		return ResponseEntity.ok(new MessageResponse("cập nhật ticket thành công"));
	}
	
	@GetMapping("/count")
    @Operation(summary="Thống kê vé vé còn hạn")
	public ResponseEntity<Long> countDestinations(){
		Long count = ticketservice.count();
		return ResponseEntity.ok(count);
	}
}
