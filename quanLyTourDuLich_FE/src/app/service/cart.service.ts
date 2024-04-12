import { Injectable } from '@angular/core';
import { ServiceService } from './service.service';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: any[] = [];

  totalPrice = 0;

  total = 0;

  // lưu trứ các dịch vụ cho từng tour
  selectedServices: { [tourId: string]: any[] } = {};

  constructor(private services: ServiceService) {}

  // Lấy giá của từng dịch vụ trong tour cụ thể
  getServicePricesForTour(tourId: string): number[] | undefined {
    const tour = this.items.find((item) => item.id === tourId);
    if (tour && tour.services) {
      return tour.services.map((service: any) => service.price);
    }
    return undefined;
  }

  // lấy tổng giá trị của dịch vụ trong mỗi tour
  getServicePriceForTour(tourId: string): number | undefined {
    const tour = this.items.find((item) => item.id === tourId);
    if (tour && tour.totalServiceCost) {
      return tour.totalServiceCost; // Trả về tổng giá của các dịch vụ cho tour cụ thể
    }
    return undefined;
  }

  addServiceToTour(tourId: string, service: any) {
    const tourIndex = this.items.findIndex((item) => item.id === tourId);
    if (tourIndex !== -1) {
      const tour = this.items[tourIndex];
  
      if (!tour.services) {
        tour.services = [];
      }
      console.log(service)
      tour.services.push(service.id);
      console.log('service.id', service.id)
      // Tính lại subTotal của tour sau khi thêm dịch vụ
      tour.subTotal += service.price;
  
      // Cập nhật lại tổng giá của các tour sau khi thêm dịch vụ mới
      this.updateTotalPrice(service.price);
  
      this.items[tourIndex] = tour;
      this.saveCart();
      this.getTotalPrice();
    }
  }

  

  updateTotalPrice(servicePrice: number) {
    // Tính tổng giá của giỏ hàng dựa trên giá của dịch vụ mới được thêm vào
    this.items.forEach((tour: any) => {
      tour.totalPrice = (tour.totalPrice || 0) + servicePrice;
    });
  
    this.saveCart(); // Lưu lại giỏ hàng sau khi cập nhật tổng giá
    this.getTotalPrice();
  }
  
  


  getServicesForTour(tourId: number): Observable<any[]> {
    const tour = this.items.find((item: any) => item.id === tourId);
    if (tour != null && tour.services && tour.services.id != null) {
      return this.services.getServiceById(tour.services.id).pipe(
        catchError(err => {
          console.log(err);
          return of([]); // Trả về một mảng rỗng trong trường hợp có lỗi
        })
      );
    } else {
      return of([]); // Trả về một mảng rỗng nếu không tìm thấy tour hoặc tour.services.id không tồn tại
    }
      //hello 
  }


  removeServiceFromTour(tourId: string, service: any) {
    const tourIndex = this.items.findIndex((item) => item.id === tourId);
    if (tourIndex !== -1) {
      const tour = this.items[tourIndex];

      if (tour.services) {
        const index = tour.services.findIndex((s: any) => s.id === service.id);
        if (index !== -1) {
          tour.services.splice(index, 1);

          // Tính lại subTotal của tour sau khi xóa dịch vụ
          tour.subTotal -= service.price;

          this.items[tourIndex] = tour;
          this.saveCart();
          this.getTotalPrice();
          console.log('this.getTotalPrice();  '+ this.getTotalPrice()); // Cập nhật tổng giá của giỏ hàng
        }
      }
    }
  }

  saveCart(): void {
    localStorage.setItem('cart_items', JSON.stringify(this.items));
  }

  addToCart(item: any, quantity: number) {
    this.loadCart();
    if (!this.tourInCart(item)) {
      item.quantity = quantity;
      item.subTotal = item.quantity * item.price;
      this.items.push(item);
    } else {
      this.items.forEach((res) => {
        if (res.id == item.id) {
          res.quantity += quantity;
          res.subTotal = res.quantity * res.price;
        }
      });
    }
    item.quantity = quantity;
    this.saveCart();
    this.getTotalPrice();
  }

  updateCart(item: any, quantity: number) {
    this.items.forEach((res) => {
      if (res.id == item.id) {
        res.quantity = quantity;
        res.subTotal = res.quantity * res.price;
      }
    });
    this.saveCart();
    this.getTotalPrice();
  }

  tourInCart(item: any): boolean {
    return this.items.findIndex((x: any) => x.id == item.id) > -1;
  }

  loadCart(): void {
    this.items = JSON.parse(localStorage.getItem('cart_items') as any) || [];
    this.getTotalPrice();
  }

  getItems() {
    return this.items;
    this.getTotalPrice();
  }

  getTotalPrice() {
    this.totalPrice = 0;
    this.total = 0;
    this.items.forEach((res) => {
      this.totalPrice += res.subTotal;
      this.total = this.totalPrice;
    });
    return this.totalPrice;
  }

  remove(item: any) {
    const index = this.items.findIndex((o: any) => o.id == item.id);
    if (index > -1) {
      this.items.splice(index, 1);
      this.saveCart();
    }
    this.getTotalPrice();
  }

  clearCart() {
    this.items = [];
    this.getTotalPrice();
    localStorage.removeItem('cart_items');
  }
}
