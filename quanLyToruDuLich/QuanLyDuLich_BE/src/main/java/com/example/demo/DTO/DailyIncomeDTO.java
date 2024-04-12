package com.example.demo.DTO;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
//thu nhập hàng ngày
public class DailyIncomeDTO {
    private int dayOfMonth;
    private double dailyIncome;
}
