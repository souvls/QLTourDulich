import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { faHeart, faRetweet, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../../service/cart.service';
import { TourService } from '../../../service/tour.service';


@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrl: './tour.component.css',
})
export class TourComponent {
[x: string]: any;

  heart = faHeart;
  bag = faShoppingBag;
  retweet = faRetweet;

  p: number = 1;
  listTour: any[] = [];
  ischeckNotList: boolean = false;
  id: number = 0;

  constructor(private route: ActivatedRoute, private tourservice: TourService, public cartService: CartService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.route.params.subscribe(params => {
      const id = params['id'];

      if (id) {
        console.log('this.getServiceById();');
        this.getTourByIdDestinations();
        this.ischeckNotList = true;
      } else {
        console.log('this.getAllService();');
        this.getTour();
        this.ischeckNotList = false;
      }
    });
  }

  getTour() {
    this.tourservice.getAllTour().subscribe({
      next: (res) => {
        this.listTour = res;
      },
      error: (err) => {
        console.log('lỗi lấy all tour');
      },
    });
  }

  getTourByIdDestinations() {
    this.tourservice.getTourByIdDestinations(this.id).subscribe({
      next: (res) => {
        this.listTour = res;
      },
      error: (err) => {
        console.log('lỗi lấy all tour');
      },
    });
  }


  addToCart(item: any){
    this.cartService.getItems();
    this.openSnackBar('đã thêm tour ' +item.name+' thêm vào giỏ hàng', 'Close');
    this.cartService.addToCart(item,1);
  }
  
  // addToWishList(item: any){
  //   if(!this.wishlistService.productInWishList(item)){
  //     this.openSnackBar('đã thêm tour ' +item.name+' thêm vào danh sách yêu thích', 'Close');
  //     this.wishlistService.addToWishList(item);
  //   }
  // }
  


  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 3000; // Thời gian hiển thị thông báo (ms)
    config.panelClass = ['custom-snackbar']; // Sử dụng style custom
    this.snackBar.open(message, action, config);
  }
}
