package com.example.demo.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="destinations")
public class Destinations { // điểm đến
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @Column(name = "description",columnDefinition = "TEXT")
    private String describe; //mô tả
    
    
    @Column(name = "province",columnDefinition = "TEXT")
    private String province; //tỉnh/thành phố
    
    @ManyToMany
    @JoinTable(name = "destinations_image",joinColumns = @JoinColumn(name="destinations_id"),inverseJoinColumns = @JoinColumn(name="image_id"))
    private List<Image> image;
}
