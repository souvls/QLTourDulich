package com.example.demo.DTO;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//thu nhập hàng tháng
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MonthlyIncomeDTO {
    private int monthOfYear;
    private double monthlyIncome;
}
