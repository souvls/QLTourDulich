package com.example.demo.request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateServiceRequest {

    private String name;

    private String description;

    private long price;
    
    private List<Long> idTour;
}
