package com.example.demo.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "bookings")
public class Bookings {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String customerName;

    private Date bookingDate;
    
    private String status;
    
    @ManyToMany
    @JoinColumn(name="tour_id")
    private List<Tour> tours;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
}
