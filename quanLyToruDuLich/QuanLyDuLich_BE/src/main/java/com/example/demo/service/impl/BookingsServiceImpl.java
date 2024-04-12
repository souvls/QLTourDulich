package com.example.demo.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Bookings;
import com.example.demo.repository.BookingsRepository;
import com.example.demo.request.CreateBookingsRequest;
import com.example.demo.service.BookingsService;

import java.util.List;

@Service
public class BookingsServiceImpl implements BookingsService{

	@Autowired
	private BookingsRepository bookingsRepository;
	

	@Override
	public List<Bookings> getListBoookingByUserId(Long id){
		return bookingsRepository.findAllByUserId(id);
	}


	@Override
	public void createBookings(CreateBookingsRequest data) {
		Bookings bookings = new Bookings();
		
		bookings.setCustomerName(data.getCustomerName());
		bookings.setBookingDate(data.getBookingDate());
		bookings.setStatus(data.getStatus());
		bookings.setCustomerName(data.getCustomerName());
		bookings.setTours(data.getTours());
		bookings.setUser(data.getUser());
		
		// TODO Auto-generated method stub
		bookingsRepository.save(bookings);
	}

}
