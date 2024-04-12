import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const USER_API = "http://localhost:8080/api/service/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }


  getAllService():Observable<any>{
    return this.http.get(USER_API);
  }

  getServiceById(id: number):Observable<any>{
    return this.http.get(USER_API+id)
  }

  getAllServiceInTourById(id: number):Observable<any>{
    return this.http.get(USER_API+"tour/" + id)
  }

  createService(name: string, description: string ,price: string,idTour: Array<string>):Observable<any>{
    let body = JSON.stringify({ name, description, price, idTour});
    return this.http.post(USER_API+"create", body, httpOptions);
  }

  updateService(id: number, name: string, description: string ,price: string,idTour: Array<string>):Observable<any>{
    let body = JSON.stringify({ name, description, price, idTour});
    return this.http.put(USER_API+"update/"+ id, body, httpOptions);
  }

  deleteService(id: number):Observable<any>{
    return this.http.delete(USER_API+"delete/"+ id, httpOptions);
  }
}
