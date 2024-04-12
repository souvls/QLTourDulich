package com.example.demo.controller;

import com.example.demo.entity.Bookings;
import com.example.demo.entity.Destinations;
import com.example.demo.service.BookingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*",maxAge = 3600)
public class BookingsController {

    @Autowired
    private BookingsService bookingservice;

    @GetMapping("/{id}")
    public ResponseEntity<List<Bookings>> getListBoookingByUserId(@PathVariable Long id){
        List<Bookings> Bookingss = bookingservice.getListBoookingByUserId(id);
        return ResponseEntity.ok(Bookingss);
    }
}
