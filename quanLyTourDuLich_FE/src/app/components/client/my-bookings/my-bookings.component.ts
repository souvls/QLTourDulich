import { Component } from '@angular/core';
import { BookingsService } from '../../../service/bookings.service';
import { StorageService } from '../../../service/storage.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent {
  searchText = '';
  p: number = 1;
  id: number = 1;

  listMyBookings: any[] = [];

  constructor(private bookingservice: BookingsService, private storageService: StorageService){}
  ngOnInit(): void {
    this.id = this.storageService.getUser().user?.id;
this.getAllBookingByUserId();
  }

  getAllBookingByUserId(){
    this.bookingservice.getAllBookingsByUserId(this.id).subscribe({
      next:(res)=>{
        this.listMyBookings = res;
        console.log('list bookings theo id',  res);
      },error: err => {
        console.log('Lỗi tìm list bookings theo id', err);
      }
    })
  }
}
