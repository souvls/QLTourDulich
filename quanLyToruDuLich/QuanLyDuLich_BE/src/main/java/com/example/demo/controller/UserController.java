package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Tour;
import com.example.demo.entity.User;
import com.example.demo.request.ChangePasswordRequest;
import com.example.demo.request.UpdateProfileRequest;
import com.example.demo.response.MessageResponse;
import com.example.demo.service.UserService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*",maxAge = 3600)
public class UserController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/testmysql")
    public ResponseEntity<String> testMySQLConnection() {
        try {
            List<Map<String, Object>> result = jdbcTemplate.queryForList("SELECT * FROM user.user;");
            if (!result.isEmpty()) {
                return ResponseEntity.ok("Kết nối MySQL hoạt động!");
            } else {
                return ResponseEntity.ok("Không có dữ liệu trả về từ MySQL.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi kết nối tới MySQL: " + e.getMessage());
        }
    }
    
	@GetMapping("/all")
	public ResponseEntity<List<User>> getAllTour(){
		List<User> Users = userService.getAllUsser();
		return ResponseEntity.ok(Users);
	}
    
    @GetMapping("/")
    @Operation(summary="Lấy ra user bằng username")
    public ResponseEntity<User> getuser(@RequestParam("username") String username){
        User user = userService.getUserByUsername(username);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/update")
    @Operation(summary="Cập nhật user")
    public ResponseEntity<User> updateProfile(@RequestBody UpdateProfileRequest request){
        User user = userService.updateUser(request);
        return ResponseEntity.ok(user);
    }

     @PutMapping("/password")
     public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request){
         userService.changePassword(request);
         return ResponseEntity.ok(new MessageResponse("Change Password Success!"));
     }
     
 	@GetMapping("/count")
    @Operation(summary="Thống kê người dùng")
	public ResponseEntity<Long> countUser(){
		Long count = userService.count();
		return ResponseEntity.ok(count);
	}
 	
 	@GetMapping("/count/online")
    @Operation(summary="Thống kê người dùng đang hoạt động")
	public ResponseEntity<Long> countUserOnline(){
		Long count = userService.countEnabled();
		return ResponseEntity.ok(count);
	}
 
}
