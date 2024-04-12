package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.User;
import com.example.demo.request.ChangePasswordRequest;
import com.example.demo.request.CreateUserRequest;
import com.example.demo.request.UpdateProfileRequest;

public interface UserService {
	
	List<User> getListUserByVerificationCode(String code);
    
	String getAuthenticationCodeForUser(String username);
	
	void saveAuthenticationCodeForUser(String username);
	
    void register(CreateUserRequest request);

    User getUserByUsername(String username);

    User updateUser(UpdateProfileRequest request);

    void changePassword(ChangePasswordRequest request);
    
    Long countUser();
    
	List<User> getAllUsser();
	
	Long count();
	
	void updateUserEnabledStatus(String username, Long status);
	
	Long countEnabled();
}
