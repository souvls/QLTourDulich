import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faHeart, faPhone, faRightFromBracket, faShoppingBag, faUser } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { AuthService } from './service/auth.service';
import { CartService } from './service/cart.service';
import { StorageService } from './service/storage.service';
import { initFlowbite } from 'flowbite';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService]
})
export class AppComponent{
  title = 'QuanLyTourDuLich_FE';

  heart = faHeart;
  bag = faShoppingBag;
  phone = faPhone;
  userIcon = faUser;
  logoutIcon = faRightFromBracket;
  bars = faBars;

  isLoggedIn = true;
  roles: string[] = [];
  username!: string;
  errorMessage = '';

  keyword: any;

  constructor(
     private authService: AuthService,
     private storageService: StorageService,
     private messageService: MessageService,
     private router: Router,
     public cartService: CartService
  ) {}

  ngOnInit(): void {
    initFlowbite();
    this.cartService.loadCart();
    // this.isLoggedIn = this.storageService.isLoggedIn();
    this.username = this.storageService.getUser().user?.username;
    this.roles = this.storageService.getUser().user?.roles;
    console.log(this.isLoggedIn + this.username + this.roles);
    this.authService.isLoggedIn$.subscribe((loggedInStatus: boolean) => {
      this.isLoggedIn = loggedInStatus;
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
}
