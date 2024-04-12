import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const DESTINATIONS_API = 'http://localhost:8080/api/bookings/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor(private http:HttpClient) { }

  getAllBookingsByUserId(id: number):Observable<any>{
    return this.http.get(DESTINATIONS_API+id);
  }
}
