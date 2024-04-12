import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import SockJS from "sockjs-client";
import * as Stomp from "stompjs";

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: WebSocket;
  private stompClient: Stomp.Client;

  private receivedDataSubject = new BehaviorSubject<any>(null);
  receivedData$ = this.receivedDataSubject.asObservable();

  constructor() {
    this.socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(this.socket);
  }

  connect(topic: string): void {
    const connected: boolean = this.stompClient.connected;
    if (connected) {
      this.subscribeToTopic(topic);
      return;
    }

    this.stompClient.connect({}, (): any => {
      this.subscribeToTopic(topic);
    });
  }

  private subscribeToTopic(topic: string): void {
    this.stompClient.subscribe(topic, (message: Stomp.Message) => {
      const data = message.body; // Lấy nội dung của thông điệp nhận được
      this.receivedDataSubject.next(data); // Truyền chuỗi thông điệp trực tiếp tới BehaviorSubject
    });
  }  
}

