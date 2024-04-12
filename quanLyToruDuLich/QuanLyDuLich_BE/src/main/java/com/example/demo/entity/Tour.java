package com.example.demo.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
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
@Table(name = "tour")
public class Tour {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;  

    private long price;

    private Date startDate;
    
    private Date endDate;

    private String status;
    
    private long participantsCount; // số lượng người thamg gia
    
    @ManyToOne
    @JoinColumn(name = "destinations_id")
    private Destinations destinations;

    @ManyToMany
    @JoinTable(name = "tour_image",joinColumns = @JoinColumn(name="tour_id"),inverseJoinColumns = @JoinColumn(name="image_id"))
    private List<Image> images;
}
