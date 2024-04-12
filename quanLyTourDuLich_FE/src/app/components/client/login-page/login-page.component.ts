import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { StorageService } from '../../../service/storage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  isSuccessful = false;
  isSignUpFailed = false;
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  errorMessage = '';
  currentUser: any;
  
  loginForm: any = {
    username: null,
    password: null,
  };

  registerForm: any = {
    username: null,
    email: null,
    password: null,
  };

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    console.log(this.currentUser);
  }

  login(): void {
    const { username, password } = this.loginForm;
    console.log(this.loginForm, username, password);
    this.authService.login(username, password).subscribe({
      next: (res) => {
        this.storageService.saveUser(res);
        console.log(
          'login thành công      ',
          '\n all :',
          res,
          '\n tài khoản:  ',
          res.user.username,
          '\n storageService: ',
          this.storageService.getUser().user.roles,
          '\n.jwt.value: ',
          this.storageService.getUser().jwt.value,
          ' \nkết thúc storage'
        );
        this.openSnackBar('Đăng nhập thành công', 'Close');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
        // this.isLoggedIn = false;
        // this.isLoginFailed = true;
        this.openSnackBar('Đăng nhập thất bại', 'Close');
      },
    });
  }

  register(): void {
    const { username, email, password } = this.registerForm;
    console.log(this.registerForm);
    this.authService.register(username, email, password).subscribe({
      next: (res) => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.loginForm.username = username;
        this.loginForm.password = password;
        this.login();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      },
    });
  }

  loginFormChange() {
    document
      .getElementById('container')
      ?.classList.remove('right-panel-active');
  }
  registerFormChange() {
    document.getElementById('container')?.classList.add('right-panel-active');
  }

  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 3000; // Thời gian hiển thị thông báo (ms)
    config.panelClass = ['custom-snackbar']; // Sử dụng style custom
    this.snackBar.open(message, action, config);
  }

}
