import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../service/cart.service';
import { ReviewsService } from '../../../service/reviews.service';
import { StorageService } from '../../../service/storage.service';
import { TourService } from '../../../service/tour.service';
import { WebSocketService } from '../../../service/web-socket.service';


@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrl: './tour-detail.component.css',
})
export class TourDetailComponent {
  username: any;
  reviewForm: any = {
    yourName: null,
    selectedRating: null,
    description: null,
  };

  id: number = 0;
  tour: any;
  quantity: number = 1;
  reviewList: any[] = [];
  averageStars: number = 0;
  starsArray: number[] = Array.from({length: 5}, (_, i) => i);

  constructor(
    private tourservice: TourService,
    private router: Router,
    private route: ActivatedRoute,
    public cartService: CartService,

    private snackBar: MatSnackBar,
    private reviewService: ReviewsService,
    private storageService: StorageService,
    private webSocketService: WebSocketService
  ) {
    // Kết nối đến WebSocket và đăng ký lắng nghe khi Component được khởi tạo
    const topic = '/topic/reviews/socket';
    this.webSocketService.connect(topic);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.username = this.storageService.getUser().user?.username;
    console.log('id lấy được từ trang list tour' + this.id);
    this.getTour();
    this.getAllReview();
  }

  transformName(name: string): string {
    if (name && name.length > 3) {
      const visiblePart = name.slice(0, 4); // Lấy 4 ký tự đầu tiên
      const hiddenPart = name.slice(4).replace(/./g, '*'); // Che đi phần còn lại bằng '*'
      return visiblePart + hiddenPart;
    } else {
      return name;
    }
  }
  
  calculateOverallAverageStars(reviews: any[]): number {
    console.log('list: '+ reviews.length);
    if (reviews.length === 0) {
      return 0;
    }
    console.log('calculateOverallAverageStars: ' );
    const totalStars = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageStars = totalStars / reviews.length;
    return averageStars;
  }

  CreatReview(): void {
    const { yourName, selectedRating, description } = this.reviewForm;
    console.log(this.reviewForm);
    this.reviewService
      .creatReview(
        this.id,
        this.username,
        yourName,
        selectedRating,
        description
      )
      .subscribe({
        next: (res) => {
          // Lắng nghe dữ liệu từ server
          this.webSocketService.receivedData$.subscribe((data) => {
            console.log('Received data from server:', data);
            this.openSnackBar(data, 'close');
          });
        },
        error: (err) => {
          this.openSnackBar('lỗi server rồi vui lòng đợi chốc lát', 'close');
        },
      });
  }

  getAllReview() {
    this.reviewService.getAllReviewsById(this.id).subscribe({
      next: (res) => {
        console.log(res);
        this.reviewList = res;
        const averageStars = this.calculateOverallAverageStars(this.reviewList);
        //tính số đánh giá raiting trung bình của tour 
        this.averageStars = averageStars;
      },
      error: (err) => {
        console.log('Lỗi lấy all reviews', err);
      },
    });
  }

  getTour() {
    this.tourservice.getTourById(this.id).subscribe({
      next: (res) => {
        console.log(res);
        this.tour = res;

        // Truy cập thông tin của điểm đến từ trường 'destinations'
        if (res.destinations) {
          console.log('Destination Name:', res.destinations.name);
          console.log('Destination Description:', res.destinations.describe);
          // Truy cập các trường khác của điểm đến tại đây
        }
      },
      error: (err) => {
        console.log('Lỗi tìm tour chi tiết', err);
      },
    });
  }

  getDuration() {
    const start = new Date(this.tour?.startDate);
    const end = new Date(this.tour?.endDate);

    const timeDiff = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    const nights = diffDays - 1; // Số đêm = số ngày - 1

    return { days: diffDays, nights: nights };
  }

  addToCart(item: any) {
    this.cartService.getItems();
    this.openSnackBar(
      'đã thêm tour ' + item.name + ' thêm vào giỏ hàng',
      'Close'
    );
    this.cartService.addToCart(item, 1);
  }

  // addToWishList(item: any) {
  //   if (!this.wishlistService.productInWishList(item)) {
  //     this.openSnackBar(
  //       'đã thêm tour ' + item.name + ' thêm vào danh sách yêu thích',
  //       'Close'
  //     );
  //     this.wishlistService.addToWishList(item);
  //   }
  // }

  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 8000; // Thời gian hiển thị thông báo (ms)
    config.panelClass = ['custom-snackbar']; // Sử dụng style custom
    this.snackBar.open(message, action, config);
  }

  // TypeScript
  getRatingStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    const emptyStars = 5 - rating;
    return Array(emptyStars).fill(0);
  }
}
