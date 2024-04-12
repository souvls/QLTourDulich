package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Reviews;
import com.example.demo.request.CreateReviewRequest;
import com.example.demo.request.UpdateReviewRequest;

public interface ReviewsService {

	
	List<Reviews> getListService();
	
	List<Reviews> getListServiceByIdTour(long id);
	
	void CreateReview(CreateReviewRequest cr);
	
	Reviews updateReview(Long id,UpdateReviewRequest request);
	
	void deleteReview(Long id);
	
	Long count();
}
