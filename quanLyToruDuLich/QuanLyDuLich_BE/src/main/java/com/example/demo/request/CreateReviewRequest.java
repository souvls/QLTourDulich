package com.example.demo.request;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.example.demo.entity.Tour;
import com.example.demo.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateReviewRequest {
    private long id;

    private String username;
    
    private String yourName;
    
    private long selectedRating;

    private String description;

}
