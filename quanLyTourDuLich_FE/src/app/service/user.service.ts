import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const USER_API = 'http://localhost:8080/api/user/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUser(): Observable<any> {
    return this.http.get(USER_API + 'all');
  }

  getUser(username: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('username', username);
    return this.http.get(USER_API, { params: params });
  }

  updateProfile(
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    country: string,
    state: string,
    address: string,
    phone: string
  ): Observable<any> {
    return this.http.put(
      USER_API + 'update',
      { username, firstname, lastname, email, country, state, address, phone },
      httpOptions
    );
  }

  updateUser(
    id: number,
    Address: string,
    Country: string,
    Email: string,
    Firstname: string,
    Lastname: string,
    Password: string,
    Phone: string,
    State: string,
    Username: string,
    images: Array<string>
  ): Observable<any> {
    return this.http.put(
      USER_API + 'update/'+ id,
      {
        Address,
        Country,
        Email,
        Firstname,
        Lastname,
        Password,
        Phone,
        State,
        Username,
        images,
      },
      httpOptions
    );
  }

  createUser(
    Address: string,
    Country: string,
    Email: string,
    Firstname: string,
    Lastname: string,
    Password: string,
    Phone: string,
    State: string,
    Username: string,
    images: Array<string>
  ): Observable<any> {
    return this.http.put(
      USER_API + 'create',
      {
        Address,
        Country,
        Email,
        Firstname,
        Lastname,
        Password,
        Phone,
        State,
        Username,
        images,
      },
      httpOptions
    );
  }

  changePassword(
    username: string,
    oldPassword: string,
    newPassword: string
  ): Observable<any> {
    return this.http.put(
      USER_API + 'password',
      { username, oldPassword, newPassword },
      httpOptions
    );
  }


  deleteUser(id: number){
    return this.http.delete(USER_API+'delete/'+id);
  }

  getCountUser(): Observable<any> {
    return this.http.get(USER_API+'count');
  }

  getCountUserOnline(): Observable<any> {
    return this.http.get(USER_API+'count/online');
  }
}
