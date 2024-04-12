package com.example.demo.service.impl;

import java.util.Date;

import javax.persistence.Column;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Statistics;
import com.example.demo.repository.StatisticsRepository;
import com.example.demo.repository.TicketRepository;
import com.example.demo.request.CreateStatisticsRequest;
import com.example.demo.service.StatisticsService;

@Service
public class StatisticsServiceImpl implements StatisticsService{

	@Autowired
	private StatisticsRepository StatisticsRepository;
	
	@Override
	public void createStatistics(CreateStatisticsRequest cr) {
		Statistics statistics = new Statistics();
		
		statistics.setTime(cr.getTime());
		statistics.setRevenue(cr.getRevenue());
		statistics.setSoldToursCount(cr.getSoldToursCount());
		statistics.setDescription(cr.getDescription());
		// TODO Auto-generated method stub
		StatisticsRepository.save(statistics);
	}


}
