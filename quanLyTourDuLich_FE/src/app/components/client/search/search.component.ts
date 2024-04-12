import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faHeart,
  faRetweet,
  faShoppingBag,
} from '@fortawesome/free-solid-svg-icons';
import { Observable, mergeMap, of } from 'rxjs';
import { DestinationsService } from '../../../service/destinations.service';
import { TourService } from '../../../service/tour.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  p: number = 1;
  heart = faHeart;
  bag = faShoppingBag;
  retweet = faRetweet;

  keyword: any;
  listItem: any[] = [];
  istour: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private destinationService: DestinationsService,
    private tourService: TourService
  ) {}

  ngOnInit(): void {
    this.keyword = this.route.snapshot.params['keyword'];
    console.log(this.keyword);
    this.getListTourByKeyword();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }


  getListTourByKeyword() {
    let tourByName$: Observable<any> = this.tourService.getAllTourByName(this.keyword);
    let destination$: Observable<any> = this.destinationService.getAllDestinationsByKeywork(this.keyword);
  
    tourByName$.pipe(
      mergeMap((tourByName) => {
        if (tourByName.length > 0) {
          this.istour = true;
          console.log("tourByName");
          return of(tourByName);
        } else if (!isNaN(Number(this.keyword))) {
          // Kiểm tra xem keyword có thể chuyển đổi thành số không
          this.istour = true;
          console.log("getAllTourByPrice");
          return this.tourService.getAllTourByPrice(this.keyword);
        } else {
          this.istour = false;
          // Nếu không tìm thấy theo tên và không phải là số, thực hiện tìm theo địa điểm
          console.log("destination");
          return destination$;
        }
      })
    ).subscribe({
      next: (res) => {
        this.listItem = res;
        console.log(this.listItem);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  

  addToCart(item: any) {
    // this.cartService.getItems();
    // this.cartService.addToCart(item,1);
  }

  addToWishList(item: any) {
    // if(!this.wishlistService.productInWishList(item)){
    //   this.wishlistService.addToWishList(item);
    // }
  }
}
