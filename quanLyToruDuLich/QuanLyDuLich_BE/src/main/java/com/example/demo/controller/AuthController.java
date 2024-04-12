package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.request.CreateUserRequest;
import com.example.demo.request.LoginRequest;
import com.example.demo.response.MessageResponse;
import com.example.demo.response.UserInfoResponse;
import com.example.demo.security.jwt.JwtUtils;
import com.example.demo.security.service.UserDetailsImpl;
import com.example.demo.service.UserService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*",maxAge = 3600)
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

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
    
    
    @PostMapping("/login")
    @Operation(summary="Đăng nhập")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),
                        loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        userService.updateUserEnabledStatus(userDetails.getUsername(), Long.valueOf(1));

        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("jwt", jwtCookie);
        responseBody.put("user", new UserInfoResponse(userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles)); 
        
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(responseBody);
        //return ResponseEntity.ok(jwtCookie);
    }

    @PostMapping("/register")
    @Operation(summary="Đăng ký")
    public ResponseEntity<?> register(@Valid @RequestBody CreateUserRequest request){
      
        userService.register(request);
      
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @PostMapping("/logout/{username}")
    @Operation(summary="Đăng xuất")
    public ResponseEntity<?> logoutUser(@PathVariable String username) {
      ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
      userService.updateUserEnabledStatus(username, Long.valueOf(0));
      return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
          .body(new MessageResponse("You've been logout!"));
    }
}
