import { Component } from '@angular/core';
import { DestinationsService } from '../../../service/destinations.service';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrl: './destinations.component.css',
})
export class DestinationsComponent {

  p: number = 1;
  listDestinationshot: any[] = [];
  listDestinations: any[] = [];

  ngOnInit() {
    this.getAllListDestinations();
    this.getAllListDestinationsHot();
  }

  constructor(private destinationsService: DestinationsService) {}

  getAllListDestinationsHot() {
    this.destinationsService.getListDestinationsHot().subscribe({
      next: (res) => {
        this.listDestinationshot = res;
        console.log(this.listDestinations)
      },
      error: (err) => {
        console.log('lỗi lấy destination tour');
      },
    });
  }

  getAllListDestinations() {
    this.destinationsService.getListDestinations().subscribe({
      next: (res) => {
        this.listDestinations = res;
        console.log(this.listDestinations)
      },
      error: (err) => {
        console.log('lỗi lấy destination tour');
      },
    });
  }

}
