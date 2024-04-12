package com.example.demo.request;

import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.example.demo.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateTicketRequest {


    private String name;

    private String description;

    private Date startDate;
    
    private Date endDate;

    private String status;
    
    private long participantsCount; 
    
    private User user;
}
