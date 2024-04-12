import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  faBars,
  faHeart,
  faPhone,
  faShoppingBag,
} from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../../service/cart.service';
import { ServiceService } from '../../../service/service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  heart = faHeart;
  bag = faShoppingBag;
  phone = faPhone;
  bars = faBars;
  selectedServices: { [productId: string]: string[] } = {};
  services: any[] = []


  constructor(public cartService: CartService, private serviceService: ServiceService, private router: Router) {}


  ngOnInit(){
    this.cartService.loadCart();
    console.log(this.cartService)
  }

  getAllServiceInTourById(id: number){
    this.serviceService.getAllServiceInTourById(id).subscribe({
      next:(res)=>{
        this.services = res;
      },error: err => {
        console.log('Lỗi tìm service theo id', err);
      }
    })
  }

  toggleServiceForm(product: any) {
    this.cartService.items.forEach((item) => {
      if (item.id === product.id) {
        item.showServiceForm = !item.showServiceForm;
      } else {
        item.showServiceForm = false;
      }
    });
  }


  removeServiceFromTour(tourId: string, service: any) {
    this.cartService.removeServiceFromTour(tourId, service);
  }

  
  
  addServiceToProduct(product: any, service: any, event: Event) {

    this.cartService.addServiceToTour(product.id, service);

  }
  



  removeFromCart(item: any) {
    this.cartService.remove(item);
  }

  updateQuantity(item: any, event: any) {
    let quantity: number = event.target.value;
    this.cartService.updateCart(item, quantity);
  }

  plusQuantity(item: any) {
    let quantity = Number(item.quantity);
    this.cartService.updateCart(item, (quantity += 1));
  }
  subtractQuantity(item: any) {
    if (item.quantity > 1) {
      let quantity = Number(item.quantity);
      this.cartService.updateCart(item, (quantity -= 1));
    }
  }


  navigateToService(serviceId: number) {
    // Thực hiện chuyển hướng đến service theo ID
    this.router.navigate(['/service', serviceId]);
}

}
