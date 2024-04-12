package com.example.demo.service;

import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;

import com.example.demo.entity.Ticket;
import com.example.demo.request.CreateTicketRequest;

public interface TicketService {

	void createTicket(CreateTicketRequest tk);

	List<Ticket> getListTicket();
	
	void updateTicket(CreateTicketRequest body, Long id);
	
	void deleteTicket(Long id);
	
	void deleteExpiredTickets();
	
	Long count();

	List<Ticket> getListTicketByUserId(Long id);
}
