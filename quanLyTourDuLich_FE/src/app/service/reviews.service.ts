import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const REVIEWs_API = "http://localhost:8080/api/reviews/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http: HttpClient) { }

  getAllReviews():Observable<any>{
    return this.http.get(REVIEWs_API);
  }

  getAllReviewsById(id: number):Observable<any>{
    return this.http.get(REVIEWs_API+id);
  }

  creatReview(id: number, username: string, yourName: string, selectedRating: string, description: string):Observable<any>{
    let body = JSON.stringify({ id, username, yourName, selectedRating,description });
    return this.http.post(REVIEWs_API+'create', body, httpOptions);
  }

  updateReview(id: number, name: string, description: string, rating: number):Observable<any>{
    let body = JSON.stringify({id, name, description, rating });
    return this.http.put(REVIEWs_API+'update/'+ id, body, httpOptions);
  }

  deleteReview(id: number):Observable<any>{
    return this.http.delete(REVIEWs_API+'delete/'+ id, httpOptions);
  }

  getCountReviews():Observable<any>{
    return this.http.get(REVIEWs_API+'count', httpOptions);
  }
}
