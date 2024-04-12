package com.example.demo.request;

import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import com.example.demo.entity.Destinations;
import com.example.demo.entity.Image;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateTourRequest {
    private String name;  

    private long price;

    private Date startDate;
    
    private Date endDate;

    private String status;
    
    private long participantsCount; // số lượng người thamg gia
    
    private String destinations;

    private List<Long> images;
}
