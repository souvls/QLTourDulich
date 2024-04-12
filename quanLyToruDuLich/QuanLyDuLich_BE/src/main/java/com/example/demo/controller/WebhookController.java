package com.example.demo.controller;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.demo.DTO.CartItem;
import com.example.demo.DTO.ClientSendMailRequest;
import com.example.demo.DTO.TransactionHistory;
import com.example.demo.entity.Tour;
import com.example.demo.entity.User;
import com.example.demo.request.CreateBookingsRequest;
import com.example.demo.request.CreateStatisticsRequest;
import com.example.demo.request.CreateTicketRequest;
import com.example.demo.service.BookingsService;
import com.example.demo.service.StatisticsService;
import com.example.demo.service.TicketService;
import com.example.demo.service.TourService;
import com.example.demo.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import cache.CacheManager;

@RestController
public class WebhookController {

	@Autowired
	private UserService userservice;

	@Autowired
	private TourService tourService;

	@Autowired
	private BookingsService bookingsService;

	@Autowired
	private StatisticsService statisticsservice;
	
	@Autowired
	private TicketService ticketservice;

	private final SimpMessagingTemplate messagingTemplate;

	public WebhookController(SimpMessagingTemplate messagingTemplate) {
		this.messagingTemplate = messagingTemplate;
	}

	private CacheManager cachemanager;

	ArrayList<Tour> listTour = new ArrayList<>();

	private String CustomerName;
	private String totalAmount;
	private String SpectialRequest;
	private Long QuantityOfPeople;
	private Long setSoldToursCount;

	private static final String VALID_SIGNATURE = "7ad215375bed512f790cd2ba621abdd097f7a3f176174a753677132bd6ae2ab3";

	@PostMapping("/api/webhook")
	public ResponseEntity<String> handleWebhook(@RequestBody String requestBody) throws JsonProcessingException {
		System.out.print("webhook đã hoạt động  ");
		getTransactionHistory();
		return ResponseEntity.ok("Dữ liệu Webhook đã được xử lý thành công");
	}

	@PostMapping("/getTransactionHistory")
	public ResponseEntity<String> getTransactionHistory() {
		final String uri = "https://momosv3.apimienphi.com/api/getTransHistory";

		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json");

		String accessToken = "wce1Ok4RxV5I71LEHIA9KO3TwFektmkHIGwjg1JX5AEOiyolMd";
		String phone = "0982104744";
		int limit = 1;
		int offset = 0;

		String requestBody = "{\"access_token\": \"" + accessToken + "\", \"phone\": \"" + phone + "\", \"limit\": "
				+ limit + ", \"offset\": " + offset + "}";

		HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.POST, request, String.class);

		if (response.getStatusCode() == HttpStatus.OK) {
			String responseBody = response.getBody();
			System.out.print("Dữ liệu lịch sử giao dịch: " + trimJson(responseBody) + "\n");

			try {
				ObjectMapper mapper = new ObjectMapper();
				TransactionHistory[] transactions = mapper.readValue(trimJson(responseBody),
						TransactionHistory[].class);

				List<User> users = new ArrayList();

				// Xử lý các giao dịch đã được chuyển đổi thành các đối tượng Java
				for (TransactionHistory transaction : transactions) {
					System.out.println("ID: " + transaction.getId());
					System.out.println("TranID: " + transaction.getTranId()); // mã giao dịch
					System.out.println("Amount: " + transaction.getAmount()); // số tiền
					System.out.println("getComment: " + transaction.getComment()); // nội dung giao dịch
					// ...
					users = userservice.getListUserByVerificationCode(transaction.getComment());
					if (!(users.size() > 1)) {
						User firstUser = users.get(0);

						System.out.println("totalAmount:  số tiền cần phải chuyển khi đã trừ" + totalAmount);

						if (firstUser.getVerificationCode().equals(transaction.getComment())
								&& transaction.getAmount().equals(totalAmount)) {
//						if (firstUser.getVerificationCode().equals(transaction.getComment())) {
							// xử lý khi thanh toán thành công với tiền và nội dung giao dịch
							String message = "Đơn hàng của bạn đã được thanh toán thành công!";
							messagingTemplate.convertAndSend("/topic/payment", message);
							System.out.println("  thực hiện cho user đặt hàng thành công  ");
							// thực hiện cho user đặt hàng thành công

							// tạo và lưu vào bookings
							CreateBookingsRequest createBookingsrq = new CreateBookingsRequest();
							createBookingsrq.setCustomerName(CustomerName);
							Instant currentInstant = Instant.now();
							Date currentDate = Date.from(currentInstant);
							createBookingsrq.setBookingDate(currentDate); // cài đặt ngày giờ hệ thống
							createBookingsrq.setStatus(message);
							createBookingsrq.setTours(listTour);
							createBookingsrq.setUser(firstUser);
							bookingsService.createBookings(createBookingsrq);


							// tạo ticket cho người dùng khi thanh toán thành công


// Lấy ngày lâu nhất của tour trong giỏ hàng để đặt giá trị hết hạn cho ticket
							Optional<Instant> maxEndDateOptional = listTour.stream()
									.filter(tour -> tour.getEndDate() != null)
									.map(tour -> tour.getEndDate().toInstant())
									.max(Instant::compareTo);

							Instant maxEndDate = maxEndDateOptional.orElse(null);

							ZoneId zoneId = ZoneId.of("Asia/Ho_Chi_Minh");
							Date endDateTicket = maxEndDateOptional.map(i -> Date.from(i.atZone(zoneId).toInstant())).orElse(null);

							System.out.println("endDateTicket     " + endDateTicket);
							System.out.println("maxEndDate     " + maxEndDate);

							SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

							System.out.println("Formatted endDateTicket: " + sdf.format(endDateTicket));


							CreateTicketRequest tickets = new CreateTicketRequest();
							tickets.setName("vé du kịch của: " + CustomerName);
							tickets.setDescription("yêu cầu đặc biệt của quý khách: "+ SpectialRequest);
							tickets.setStartDate(currentDate);
							if (endDateTicket != null) {
								System.out.println("  đã vào endDateTicket ");
								Date endDate = sdf.parse(sdf.format(endDateTicket));
								System.out.println("  đã vào endDate "+ endDate);
								tickets.setEndDate(endDate);
							} else {
								// Xử lý khi không có tour nào thỏa mãn điều kiện
							}
							tickets.setStatus("hoàn thành");
							tickets.setParticipantsCount(QuantityOfPeople);
							tickets.setUser(firstUser);
							ticketservice.createTicket(tickets);

							// tạo statistics cho hệ thống
							CreateStatisticsRequest statistics = new CreateStatisticsRequest();
							statistics.setTime(currentDate);
							statistics.setRevenue(Long.parseLong(totalAmount));  //thời gian update
							statistics.setSoldToursCount(listTour.size());

							statistics.setDescription(message);
							statisticsservice.createStatistics(statistics);
						}
					}
				}

				return ResponseEntity.ok("Dữ liệu lịch sử giao dịch đã được xử lý");
			} catch (Exception e) {
				e.printStackTrace();
				return ResponseEntity.badRequest().body("Lỗi khi xử lý dữ liệu");
			}
		} else {
			return ResponseEntity.status(response.getStatusCode()).body("Lỗi khi lấy lịch sử giao dịch");
		}
	}

	// cắt chuỗi cho dễ dàng xử lý string ObjectMapper
	public static String trimJson(String jsonString) {
		int startIndex = jsonString.indexOf("[");
		int lastIndex = jsonString.lastIndexOf("]") + 1;

		if (startIndex != -1 && lastIndex != -1 && startIndex < lastIndex) {
			return jsonString.substring(startIndex, lastIndex);
		}

		return "";
	}

	public String PigdtaMail(ClientSendMailRequest sdi) {

		System.out.println("sdi.getTotal() số tiền chuyển gốc:  " + sdi.getTotal());
		totalAmount = String.valueOf(sdi.getTotal() ); // 6000k
		System.out.println("totalAmount:  số tiền cần phải thanh toán khi đã trừ: " + totalAmount);

		CustomerName = sdi.getYourName();
		SpectialRequest = sdi.getSpectialRequest();

		List<CartItem> carts = sdi.getListCart();

		for (CartItem cart : carts) {
			Long id = cart.getId();
			Optional<Tour> tourOptional = tourService.getTourById(id);
			if (tourOptional.isPresent()) {
				Tour tour = tourOptional.get(); // Trích xuất Tour từ Optional
				listTour.add(tour);
				Long Quantity = cart.getQuantity();
				if (this.QuantityOfPeople == null) {
					// Nếu là null, gán giá trị mặc định hoặc giá trị khác
					this.QuantityOfPeople = 0L; // Ví dụ: Gán giá trị mặc định là 0
				}
				QuantityOfPeople += Quantity * tour.getParticipantsCount();

			} else {
				// Xử lý trường hợp không tìm thấy Tour với id tương ứng
			}
		}

		return "";
	}
}
