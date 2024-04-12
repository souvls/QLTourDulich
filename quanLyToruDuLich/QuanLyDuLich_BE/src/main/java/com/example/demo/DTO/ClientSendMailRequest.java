package com.example.demo.DTO;

import java.util.List;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientSendMailRequest {
    private String yourName;
    private String yourUsername;
    private String yourEmail;
    private String time;
    private String spectialRequest;
    private List<CartItem> listCart;  
    private long total;
}
