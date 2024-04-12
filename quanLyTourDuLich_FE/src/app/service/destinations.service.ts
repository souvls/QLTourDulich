import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const DESTINATIONS_API = 'http://localhost:8080/api/destinations/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class DestinationsService {
  constructor(private http: HttpClient) {}

  //bên sv trả về ramdom 4 obj destinaton nổi tiếng
  getListDestinationsHot(): Observable<any> {
    return this.http.get(DESTINATIONS_API + 'hot');
  }

  //bên sv trả về ramdom 4 obj destinaton nổi tiếng
  getListDestinations(): Observable<any> {
    return this.http.get(DESTINATIONS_API);
  }

  getAllDestinationsByKeywork(keyword: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('keyword', keyword);
    return this.http.get(DESTINATIONS_API + 'search/destination', {
      params: params,
    });
  }


  createDestination(description: string, name: string, province:string, images: Array<string>):Observable<any>{
    let body = JSON.stringify({ description,name,province,images,});
    return this.http.post(DESTINATIONS_API+"create",body,httpOptions);
  }

  updateDestination(id: number, description: string, name: string, province:string, images: Array<string>):Observable<any>{
    let body = JSON.stringify({ description,name,province,images,});
    return this.http.put(DESTINATIONS_API+"update/"+id,body,httpOptions);
  }

  deleteDestination(id: number):Observable<any>{
    return this.http.delete(DESTINATIONS_API+"delete/"+id);
  }

  getCountDestinations(): Observable<any> {
    return this.http.get(DESTINATIONS_API+'count');
  }
}
