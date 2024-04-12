import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

const AUTH_API = "http://localhost:8080/api/auth/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();


  register(username: string, email: string, password: string):Observable<any>{
    return this.http.post(AUTH_API + 'register',{username,email,password},httpOptions);
  }

  login(username: string,password: string):Observable<any>{
    const body = JSON.stringify({ username, password });

    return this.http.post(AUTH_API + "login", body, httpOptions).pipe(
      tap((response: any) => {
        // Kiểm tra response từ server sau khi đăng nhập thành công
        // Nếu đăng nhập thành công, thông báo về trạng thái đăng nhập mới
        this.isLoggedInSubject.next(true);
      })
    );
  }

  logout(username: string):Observable<any>{
    return this.http.post(AUTH_API + "logout/"+username,httpOptions);
  }
}
