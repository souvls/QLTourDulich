package com.example.demo.request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateDestinationsRequest {

    private String name;

    private String describe; //mô tả
    
    private String province; //tỉnh/thành phố
    
    private List<Long> image; 
}
