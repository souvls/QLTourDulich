package com.example.demo.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "statistics")
public class Statistics { // thống kê
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    private Date time;//Một trường để lưu trữ thời gian thống kê, có thể là ngày, tháng, quý hoặc năm.
    
    private long revenue; // doanh thu theo time 
    
//    private long customerCount; // số lượng khách hàng
    
    private long soldToursCount;  // số lượng tour đã bán
    
    @Column(name = "description",columnDefinition = "TEXT")
    private String description;
}
