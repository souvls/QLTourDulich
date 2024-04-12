package com.example.demo.service.impl;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Reviews;
import com.example.demo.entity.Tour;
import com.example.demo.entity.User;
import com.example.demo.exception.NotFoundException;
import com.example.demo.repository.ReviewsRepository;
import com.example.demo.request.CreateReviewRequest;
import com.example.demo.request.UpdateReviewRequest;
import com.example.demo.service.ReviewsService;
import com.example.demo.service.TourService;
import com.example.demo.service.UserService;

@Service
public class ReviewsServiceImpl implements ReviewsService {

	@Autowired
	private ReviewsRepository reviewsrepository;

	@Autowired
	private UserService userservice;

	@Autowired
	private TourService tourservice;

	private final SimpMessagingTemplate messagingTemplate;

	public ReviewsServiceImpl(SimpMessagingTemplate messagingTemplate) {
		this.messagingTemplate = messagingTemplate;
	}

	@Override
	public List<Reviews> getListService() {
		// TODO Auto-generated method stub
		return reviewsrepository.findAll();
	}

	@Override
	public List<Reviews> getListServiceByIdTour(long id) {
		// TODO Auto-generated method stub
		return reviewsrepository.findAllByIdTour(id);
	}

	@Override
	public void CreateReview(CreateReviewRequest cr) {
		Reviews reviews = new Reviews();

		Tour tour = tourservice.findListTourByIdAndUserUsername((int) cr.getId(), cr.getUsername());
		User user = userservice.getUserByUsername(cr.getUsername());
		if (tour != null) {
			LocalDate currentDate = LocalDate.now();
			LocalDate endDate = tour.getEndDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

			if (currentDate.isAfter(endDate)) {
				reviews.setName(cr.getYourName());
				reviews.setRating(cr.getSelectedRating());
				reviews.setDescription(cr.getDescription());
				reviews.setTours(tour);
				reviews.setUser(user);
				reviewsrepository.save(reviews);
				String message = "cảm ơn bạn đã gửi đánh giá cho chuyến tour này!";
				System.out.println(message);
				messagingTemplate.convertAndSend("/topic/reviews/socket", message);
			} else {
				String message = "tour này vẫn đang trong quá trình trải nghiệm vui lòng bạn hãy hoàn thành trải nghiệm cho tới khi tour kết thúc và quay lại đây đánh giá sau!";
				System.out.println(message);
				messagingTemplate.convertAndSend("/topic/reviews/socket", message);
				return;
			}
		} else {
			String message = "vui lòn trải nghiệm tour trước khi đánh giá?";
			System.out.println(message);
			messagingTemplate.convertAndSend("/topic/reviews/socket", message);
			return;
		}
	}

	@Override
	public Reviews updateReview(Long id, UpdateReviewRequest cr) {
		Reviews reviews = reviewsrepository.findById(id)
				.orElseThrow(() -> new NotFoundException("Not Found tour service Id: " + id));
		reviews.setName(cr.getName());
		reviews.setDescription(cr.getDescription());
		reviews.setRating(cr.getRating());
		reviewsrepository.save(reviews);
		return reviews;
	}

	@Override
	public void deleteReview(Long id) {
		Reviews reviews = reviewsrepository.findById(id)
				.orElseThrow(() -> new NotFoundException("Not Found tour service Id: " + id));
		reviewsrepository.delete(reviews);
	}

	@Override
	public Long count() {
		// TODO Auto-generated method stub
		return reviewsrepository.count();
	}

}
