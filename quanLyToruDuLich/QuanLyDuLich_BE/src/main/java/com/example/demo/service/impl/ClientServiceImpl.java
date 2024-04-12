package com.example.demo.service.impl;

import java.util.HashMap;
import java.util.Map;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.ClientSendMailRequest;
import com.example.demo.DTO.Mail;
import com.example.demo.controller.WebhookController;
import com.example.demo.service.ClientService;
import com.example.demo.service.MailService;
import com.example.demo.service.UserService;

@Service
public class ClientServiceImpl implements ClientService {
    @Autowired
    private MailService mailService;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private WebhookController webhookController;
    
    public String codeCurrency;
    
    @Override
    public Boolean create(ClientSendMailRequest sdi) {
    	webhookController.PigdtaMail(sdi);
    	userService.saveAuthenticationCodeForUser(sdi.getYourUsername());
    	codeCurrency = userService.getAuthenticationCodeForUser(sdi.getYourUsername());
        try {
        	Mail dataMail = new Mail();

            dataMail.setTo(sdi.getYourEmail());
            dataMail.setSubject("XÁC NHẬN TẠO MỚI THÔNG TIN NGƯỜI DÙNG");

            Map<String, Object> props = new HashMap<>();
            props.put("name", sdi.getYourName());
            props.put("username", sdi.getYourUsername());
            props.put("time", sdi.getTime());
            props.put("spectialRequest", sdi.getSpectialRequest());
            props.put("listCart", sdi.getListCart());
            props.put("total", sdi.getTotal());
            props.put("code", codeCurrency);
            dataMail.setProps(props);
            
            System.out.println("Dữ liệu getYourName: " + sdi.getYourName());
            System.out.println("Dữ liệu getYourUsername: " + sdi.getYourUsername());
            System.out.println("Dữ liệu getTime: " + sdi.getTime());
            System.out.println("Dữ liệu getSpectialRequest: " + sdi.getSpectialRequest());
            System.out.println("Dữ liệu code: " + codeCurrency);
            
            // In ra listCart để kiểm tra dữ liệu
            System.out.println("Dữ liệu listCart: " + sdi.getListCart());

            mailService.sendHtmlMail(dataMail,"client");
            return true;
        } catch (MessagingException exp){ 
            exp.printStackTrace();
        }
        return false;
    }
}
