package com.example.demo.DTO;


import java.util.Date;
import java.util.List;

import com.example.demo.entity.ServiceEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItem {
	private long id;
    private String name;
    private long price;
    private Date endDate;
    private long quantity;
    private List<ServiceEntity> services;
    private long subTotal;
}
