package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.ClientSendMailRequest;
import com.example.demo.service.ClientService;

@RestController
@RequestMapping("api/client")
@CrossOrigin(origins = "*", maxAge = 3600)
public class EmailController {

	@Autowired
	private ClientService clientService;


	@PostMapping(value = "/booking/create")
	public ResponseEntity<Boolean> create(@RequestBody ClientSendMailRequest sdi) {
		return ResponseEntity.ok(clientService.create(sdi));
	}
}
