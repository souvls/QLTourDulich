import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import {
  faBars,
  faHeart,
  faPhone,
  faRightFromBracket,
  faShoppingBag,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../service/auth.service';
import { CartService } from '../../../service/cart.service';
import { DestinationsService } from '../../../service/destinations.service';
import { ServiceService } from '../../../service/service.service';
import { StorageService } from '../../../service/storage.service';
import { TourService } from '../../../service/tour.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  listDestinationshot: any[] = [];

  heart = faHeart;
  bag = faShoppingBag;
  phone = faPhone;
  userIcon = faUser;
  logoutIcon = faRightFromBracket;
  bars = faBars;

  p: number = 1;
  isLoggedIn = false;
  roles: string[] = [];
  username!: string;
  listService: any[] = [];
  listTour: any[] = [];

  keyword: any;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private messageService: MessageService,
    private router: Router,
    private destinationsService: DestinationsService,
    private serviceService: ServiceService,
    private tourservice: TourService,
    public cartService: CartService, 
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllListDestinations();
    this.getAllService();
    this.getTour();
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.username = this.storageService.getUser().user?.username;
    this.roles = this.storageService.getUser().user?.roles;

  }

  addToCart(item: any){
    this.cartService.getItems();
    this.openSnackBar('đã thêm tour ' +item.name+' thêm vào giỏ hàng', 'Close');
    console.log(item)
    this.cartService.addToCart(item,1);
  }
  

  

  getTour() {
    this.tourservice.getAllTour().subscribe({
      next: (res) => {
        this.listTour = res;
        console.log('all tour',        this.listTour);
      },
      error: (err) => {
        console.log('lỗi lấy all tour');
      },
    });
  }

  getAllService() {
    this.serviceService.getAllService().subscribe({
      next: (res) => {
        this.listService = res;
        console.log(this.listService)
      },      error: err => {
        console.log('Lỗi tìm all service', err);
      }
    });
  }

  getAllListDestinations() {
    this.destinationsService.getListDestinationsHot().subscribe({
      next: (res) => {
        this.listDestinationshot = res;
        console.log(this.listDestinationshot)
      },
      error: (err) => {
        console.log('lỗi lấy destination tour');
      },
    });
  }

  logout(): void {
    this.authService.logout(this.username).subscribe({
      next: (res) => {
        this.storageService.clean();
        this.isLoggedIn = false;
        this.showSuccess('Bạn đã đăng xuất!!');
      },
      error: (err) => {
        this.showError(err.message);
      },
    });
  }

  showSuccess(text: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: text,
    });
  }
  showError(text: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: text,
    });
  }

  showWarn(text: string) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warn',
      detail: text,
    });
  }

  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 3000; // Thời gian hiển thị thông báo (ms)
    config.panelClass = ['custom-snackbar']; // Sử dụng style custom
    this.snackBar.open(message, action, config);
  }
}
