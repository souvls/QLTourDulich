import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../service/cart.service';
import { PaymentService } from '../../../service/payment.service';
import { WebSocketService } from '../../../service/web-socket.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent {

  keyword: any;

  qrCodeImage: any;
  private isFirstDataReceived = false;
  private previousData: any;

  constructor(
    public cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private webSocketService: WebSocketService,
    private qrCodeService: PaymentService,
    private http: HttpClient
  ) {}

  ngOnInit() {

    const topic = '/topic/payment'; // Chủ đề bạn đăng ký lắng nghe

    // Kết nối đến WebSocket và đăng ký lắng nghe khi Component được khởi tạo
    this.webSocketService.connect(topic);

    // Lắng nghe dữ liệu từ server
    this.webSocketService.receivedData$.subscribe((data) => {
      console.log('Received data from server:', data);
      if (!this.isFirstDataReceived) {
        this.isFirstDataReceived = true;
        this.previousData = data; // Lưu dữ liệu đầu tiên vào biến previousData
        return;
      }

      if (data !== this.previousData) {
        this.openSnackBar(data, 'close');
        this.previousData = data; // Lưu dữ liệu mới vào biến previousData
      }
      // Xử lý dữ liệu từ server ở đây
    });

    this.keyword = this.route.snapshot.params['code'];
    console.log('code nhận được từ server: ' + this.keyword);
    this.cartService.loadCart();
    this.getQrCodeUrl();
  }


  getQrCodeUrl(): string {
    let phone = '0982104744';
    let amount = this.cartService.total;
    let note = this.keyword;
    return `https://momosv3.apimienphi.com/api/QRCode?phone=${phone}&amount=${amount}&note=${note}`;
  }

  updateQuantity(item: any, event: any) {
    let quantity: number = event.target.value;
    this.cartService.updateCart(item, quantity);
  }

  confirmPayment() {
    // Xử lý logic xác nhận thanh toán ở đây

    // Redirect hoặc thực hiện các hành động sau khi thanh toán
    this.router.navigate(['/confirmation']);
  }

  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 100000; // Thời gian hiển thị thông báo (ms)
    config.panelClass = ['custom-snackbar']; // Sử dụng style custom
    this.snackBar.open(message, action, config);
  }
}
