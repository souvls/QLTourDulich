import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'https://momosv3.apimienphi.com/api/getTransHistory';
  private token = 'Hjyxvtht9BxksnkL4jxGeg3XRv79GeKnGobn0KcMxzpMSBBjuj';
  private apiUrl1 = 'https://momosv3.apimienphi.com/api/QRCode';
  constructor(private http: HttpClient) {}

  generateQRCode(phone: string, amount: number, note: string) {
    const url = `${this.apiUrl1}?phone=${phone}&amount=${amount}&note=${note}`;
    return this.http.get(url, { responseType: 'blob'as 'json' });
  }
  
  getTransactionHistory(phone: string, limit: number, offset: number): Observable<any> {
    const data = {
      access_token: this.token,
      phone: phone,
      limit: limit,
      offset: offset
    };

    return this.http.post<any>(this.apiUrl, data);
  }
}
