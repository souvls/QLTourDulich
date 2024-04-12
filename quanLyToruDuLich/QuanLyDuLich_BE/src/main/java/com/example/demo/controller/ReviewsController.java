package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Reviews;
import com.example.demo.request.CreateReviewRequest;
import com.example.demo.request.UpdateReviewRequest;
import com.example.demo.response.MessageResponse;
import com.example.demo.service.ReviewsService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ReviewsController {

	@Autowired
	private ReviewsService reviewsService;

	@GetMapping("/")
	public ResponseEntity<List<Reviews>> getAllReview() {
		List<Reviews> reviews = reviewsService.getListService();
		return ResponseEntity.ok(reviews);
	}

	@GetMapping("/{id}")
	public ResponseEntity<List<Reviews>> getAllReviewById(@PathVariable long id) {
		List<Reviews> reviews = reviewsService.getListServiceByIdTour(id);
		if (reviews != null) {
			return ResponseEntity.ok(reviews);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PostMapping("/create")
	public ResponseEntity<?> CreatReview(@RequestBody CreateReviewRequest request) {
		reviewsService.CreateReview(request);
		return ResponseEntity.ok(new MessageResponse("bạn đã đánh giá thành công"));
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<Reviews> CreatReview(@PathVariable Long id, @RequestBody UpdateReviewRequest request) {
		Reviews Reviews = reviewsService.updateReview(id, request);
		return ResponseEntity.ok(Reviews);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteReview(@PathVariable Long id) {
		reviewsService.deleteReview(id);
		return ResponseEntity.ok(new MessageResponse("ServiceEntity đã được xóa"));
	}
	
	
 	@GetMapping("/count")
    @Operation(summary="Thống kê đánh giá người dùng")
	public ResponseEntity<Long> countUser(){
		Long count = reviewsService.count();
		return ResponseEntity.ok(count);
	}
}
