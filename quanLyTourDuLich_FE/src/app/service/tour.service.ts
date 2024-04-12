import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const USER_API = "http://localhost:8080/api/tour/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private http: HttpClient) { }

  getAllTour():Observable<any>{
    return this.http.get(USER_API)
  }

  getAllTourByName(keywork: string):Observable<any>{
    let params = new HttpParams();
    params = params.append('keywork',keywork);
    return this.http.get(USER_API+"search/name",{params:params});
  }

  getAllTourByPrice(keywork: string):Observable<any>{
    let params = new HttpParams();
    params = params.append('keywork',keywork);
    return this.http.get(USER_API+"search/price",{params:params});
  }

  getTourById(id: number):Observable<any>{
    let params = new HttpParams();
    params = params.append('id',id);
    return this.http.get(USER_API+"tourdetail",{params:params});
  }

  getTourByIdDestinations(id: number):Observable<any>{
    let params = new HttpParams();
    params = params.append('id',id);
    return this.http.get(USER_API+"destinations",{params:params});
  }

  createTour(name:string, price: number, endDate: Date,startDate: Date, status: string ,  participantsCount:number,destinations: string, images: Array<string>):Observable<any>{
    let body = JSON.stringify({name, price, endDate, startDate, status,participantsCount ,destinations , images});
    return this.http.post(USER_API+"create",body,httpOptions);
  }

  updateTour(id: number, name:string, price: number, endDate: Date,startDate: Date, status: string ,  participantsCount:number,destinations: string, images: Array<string>):Observable<any>{
    let body = JSON.stringify({ name, price, endDate, startDate, status,participantsCount ,destinations , images});
    return this.http.put(USER_API+"update/"+ id,body,httpOptions);
  }

  deleteTour(id: number){
    let params = new HttpParams;
    params = params.append('id', id);
    return this.http.delete(USER_API+'delete',{params:params});
  }
  
  getCountTour(): Observable<any> {
    return this.http.get(USER_API+'count');
  }

  getSumPrice(): Observable<any> {
    return this.http.get(USER_API+'statistics');
  }

  sumPriceOfDay(month: number, year: number): Observable<any> {
    let params = new HttpParams;
    params = params.append('month', month);
    params = params.append('year', year);
    return this.http.get(USER_API+'statistics-day',{params:params});
  }

  sumPriceOfYear(year: number): Observable<any> {
    let params = new HttpParams;
    params = params.append('year', year);
    return this.http.get(USER_API+'statistics-year',{params:params});
  }
}
