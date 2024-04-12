import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const TICKET_API = "http://localhost:8080/api/ticket/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  getAllTicketByUserId(id: number):Observable<any>{
    return this.http.get(TICKET_API+id);
  }

  getAllTicket():Observable<any>{
    return this.http.get(TICKET_API);
  }

  createTicket(name: string, description: string, startDate: Date, status: string, participantsCount: number, user: object):Observable<any>{
    let body = JSON.stringify({ name, description, startDate, status, participantsCount, user});
    return this.http.post(TICKET_API+'create',body ,httpOptions);
  }

  updateTicket(id: number, name: string, description: string, startDate: Date, status: string, participantsCount: number, user: object):Observable<any>{
    let body = JSON.stringify({ name, description, startDate, status, participantsCount, user});
    return this.http.put(TICKET_API+'update/'+id,body ,httpOptions);
  }

  deleteTicket(id: number):Observable<any>{
    return this.http.delete(TICKET_API+'delete/'+id);
  }

  getCountTicket():Observable<any>{
    return this.http.get(TICKET_API+'count');
  }
}
