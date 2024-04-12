package com.example.demo.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "ticket")
public class Ticket {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @Column(name = "description",columnDefinition = "TEXT")
    private String description;

    private Date startDate;
    
    private Date endDate;

    private String status;
    
    private long participantsCount; // số lượng người thamg gia tour này
    
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
