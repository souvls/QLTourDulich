package com.example.demo.service;

import javax.mail.MessagingException;

import com.example.demo.DTO.Mail;

public interface MailService {
    void sendHtmlMail(Mail dataMail, String templateName) throws MessagingException;
}
