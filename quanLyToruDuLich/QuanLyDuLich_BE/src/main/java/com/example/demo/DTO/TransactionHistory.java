package com.example.demo.DTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class TransactionHistory {
    private String id;
    private String record_id;
    private String username;		//tên người gửi
    private String user;			//sdt người nhận
    private String commandInd;
    private String tranId;			//mã giao dịch
    private String clientTime;		//thời gian
    private String ackTime;			
    private String tranType;
    private String partnerId;		//sdt người gửi
    private String partnerName;		//tên người gửi
    private String amount;			//số tiền
    private String comment;			//nội dung
    private String status;			
    private String desc;			//trang thái chuỗi (thành công, thất bại)
    private String originalAmount;
    private String receiverType;
    private String extras;
    private String create_time;
    private String run_time;
    private String webhook_send;
    private String flag;
    private String data;
}
