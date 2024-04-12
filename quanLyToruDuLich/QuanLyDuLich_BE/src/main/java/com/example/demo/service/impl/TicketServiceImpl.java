package com.example.demo.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Ticket;
import com.example.demo.exception.NotFoundException;
import com.example.demo.repository.TicketRepository;
import com.example.demo.request.CreateTicketRequest;
import com.example.demo.service.TicketService;

@Service
public class TicketServiceImpl implements TicketService{

	@Autowired
	private TicketRepository ticketrepository;

	@Override
	public List<Ticket> getListTicketByUserId(Long id){
		return ticketrepository.findAllByUserId(id);
	}

	@Override
	public void createTicket(CreateTicketRequest tk) {
		Ticket tkTicket = new Ticket();
		tkTicket.setName(tk.getName());
		tkTicket.setDescription(tk.getDescription());
		tkTicket.setStartDate(tk.getStartDate());
		tkTicket.setStatus(tk.getStatus());
		tkTicket.setEndDate(tk.getEndDate());
		tkTicket.setParticipantsCount(tk.getParticipantsCount());
		tkTicket.setUser(tk.getUser());
		ticketrepository.save(tkTicket);		
		// TODO Auto-generated method stub		
	}

	@Override
	public List<Ticket> getListTicket() {
		// TODO Auto-generated method stub
		return ticketrepository.findAll();
	}

	@Override
	public void updateTicket(CreateTicketRequest tk, Long id) {
		Ticket tkTicket = ticketrepository.findById(id).orElseThrow(() -> new NotFoundException("Not Found Image With Id: " + id));
		tkTicket.setName(tk.getName());
		tkTicket.setDescription(tk.getDescription());
		tkTicket.setStartDate(tk.getStartDate());
		tkTicket.setEndDate(tk.getEndDate());
		tkTicket.setStatus(tk.getStatus());
		tkTicket.setParticipantsCount(tk.getParticipantsCount());
		tkTicket.setUser(tk.getUser());
		ticketrepository.save(tkTicket);		
		// TODO Auto-generated method stub				
	}

	@Override
	public void deleteTicket(Long id) {
		Ticket tkTicket = ticketrepository.findById(id).orElseThrow(() -> new NotFoundException("Not Found Image With Id: " + id));
		ticketrepository.delete(tkTicket);
	}

	//mỗi ngày sẽ xóa các tíchket
//    @Scheduled(fixedRate = 86400000) // Chạy mỗi ngày (86400000 milliseconds = 24 giờ)
	@Override
	@Scheduled(fixedRate = 60000)// 1 phút
    public void deleteExpiredTickets() {
    	ticketrepository.deleteExpiredTickets(); // Phương thức này xóa các ticket hết hạn trong repository của bạn
    }

	@Override
	public Long count() {
		// TODO Auto-generated method stub
		return ticketrepository.count();
	}
}
