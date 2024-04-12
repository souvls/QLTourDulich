import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = "http://localhost:8080/api/client/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class BooktourService {

  constructor(private http: HttpClient) { }

  booking(yourName: string, yourUsername: string, yourEmail: string,time: string,spectialRequest: string, listCart: any[], total: number):Observable<any>{
    const body = JSON.stringify({ yourName, yourUsername, yourEmail, time,spectialRequest, listCart, total });
    return this.http.post(AUTH_API+ 'booking/create', body, httpOptions);
  }


}
