package com.example.demo.service;

import com.example.demo.entity.Bookings;
import com.example.demo.request.CreateBookingsRequest;

import java.util.List;

public interface BookingsService {

	void createBookings(CreateBookingsRequest data);

	List<Bookings> getListBoookingByUserId(Long id);
}
