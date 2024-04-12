import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BooktourService } from '../../../service/booktour.service';
import { CartService } from '../../../service/cart.service';
import { StorageService } from '../../../service/storage.service';
import { WebSocketService } from '../../../service/web-socket.service';


@Component({
  selector: 'app-book-tour',
  templateUrl: './book-tour.component.html',
  styleUrl: './book-tour.component.css',
})
export class BookTourComponent {
  isBookTour: boolean = false;
  currentUser: any;

  FormTourBooking: any = {
    yourName: null,
    yourEmail: null,
    time: null,
    spectialRequest: null,       
  };

  constructor(
    public cartService: CartService,
    private booktourservice: BooktourService,
    private storageService: StorageService,
    private snackBar: MatSnackBar, 
    private webSocketService: WebSocketService
  ) {
  }

  ngOnInit() {
    const topic = '/topic/notification'; // Chủ đề bạn đăng ký lắng nghe

    // Kết nối đến WebSocket và đăng ký lắng nghe khi Component được khởi tạo
    this.webSocketService.connect(topic);

    // Lắng nghe dữ liệu từ server
    this.webSocketService.receivedData$.subscribe((data) => {
      console.log('Received data from server:', data);
      this.openSnackBar(data ,'close');
      // Xử lý dữ liệu từ server ở đây
    });

    this.cartService.loadCart();
    this.currentUser = this.storageService.getUser().user.username;
  }

  updateQuantity(item: any, event: any) {
    let quantity: number = event.target.value;
    this.cartService.updateCart(item, quantity);
  }

  booking(): void {
    const { yourName, yourEmail, time, spectialRequest } = this.FormTourBooking;
    const cartItems = this.cartService.items.map(item => {
      const services = Array.isArray(item.services)
        ? item.services.map((service: any) => {
            return {
              name: service?.name || '', // Provide a default value or handle undefined/null
              price: service?.price || 0 // Provide a default value or handle undefined/null
            };
          })
        : [];
    
      return {
        id: item.id,
        name: item.name || '', // Provide a default value or handle undefined/null
        price: item.price || 0, // Provide a default value or handle undefined/null
        endDate: item.endDate || null, // Provide a default value or handle undefined/null
        quantity: item.quantity,
        services: services,
        subTotal: item.subTotal
      };
    });
    
    
    // Sau đó, bạn có thể gửi cartItems lên backend
    // Đảm bảo rằng định dạng của cartItems phù hợp với yêu cầu của API của bạn
    
    console.log(this.FormTourBooking);

    console.log('cartItems:', JSON.stringify(cartItems));

    console.log('user name' + this.currentUser);

    console.log('total    ' +         this.cartService.total);
    this.booktourservice
      .booking(
        yourName,
        this.currentUser,
        yourEmail,
        time,
        spectialRequest,
        cartItems,
        this.cartService.total
      )
      .subscribe({
        next: (res) => {
          this.isBookTour = true;
          this.openSnackBar('vui lòng kiểm tra gmail của bạn', 'close');
          console.log(
            ' đã gửi thông tin đặt hàng lên server vui lòng kiểm tra gmail'
          );
        },
        error: (err) => {
          this.isBookTour = true;
          console.log(
            ' lỗi gửi thông tin đặt hàng lên server vui lòng kiểm tra booctour.component'
          );
        },
      });
  }


  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 100000; // Thời gian hiển thị thông báo (ms)
    config.panelClass = ['custom-snackbar']; // Sử dụng style custom
    this.snackBar.open(message, action, config);
  }
}
