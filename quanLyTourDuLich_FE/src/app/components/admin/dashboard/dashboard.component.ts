import { Component } from '@angular/core';
import { DestinationsService } from '../../../service/destinations.service';
import { ReviewsService } from '../../../service/reviews.service';
import { StorageService } from '../../../service/storage.service';
import { TicketService } from '../../../service/ticket.service';
import { TourService } from '../../../service/tour.service';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  countDestination!: number;
  countTour!: number;
  countUser!: number;
  countUserOnline!: number;
  countreviews!: number;
  countTicket!: number;
  SumPrice!: number;
  showMonth: boolean = false;
  showYear: boolean = false;
  selectedMonth: number | undefined;
  username!: string;


  constructor(private destinationService: DestinationsService,
    private tourService: TourService,
    private userservice: UserService,
    private reviewservice: ReviewsService,
    private ticketservice: TicketService,
    private storageService: StorageService,) {}

  ngOnInit() {
    this.username = this.storageService.getUser().user.username;
    this.getCountDestination();
    this.  getCounttour();
    this.   getCountUser();
    this.getCountUserOnline();
    this. getCountRevivews();
    this. getCountTicket();
    this.getSumPrice();

    this.tourService.sumPriceOfYear(2023).subscribe({
      next: (apiResult) => {
        this.SumPrice = apiResult;
  
        if (!apiResult || apiResult.length === 0) {
          this.chartOptions.data[0].dataPoints = this.getDefaultData();
          return;
        }
  
        const combinedData: { x: Date, y: any }[] = [];
        for (let i = 0; i < apiResult.length; i++) {
          combinedData.push({
            x: new Date(2023, i),
            y: apiResult[i]?.monthlyIncome || 0
          });
        }
  
        this.chartOptions.data[0].dataPoints = combinedData;
      },
      error: (err) => {
        console.log('Lỗi khi lấy dữ liệu từ API');
        this.chartOptions.data[0].dataPoints = this.getDefaultData();
      }
    });
  }

  getDefaultData(): { x: Date, y: any }[] {
    const defaultData: { x: Date, y: any }[] = [];
    for (let i = 0; i < 12; i++) {
      defaultData.push(
        { x: new Date(2023, 0), y: 250000 },
        { x: new Date(2023, 1), y: 210000 },
        { x: new Date(2023, 2), y: 300000 },
        { x: new Date(2023, 3), y: 350000 },
        { x: new Date(2023, 4), y: 320000 },
        { x: new Date(2023, 5), y: 280000 },
        { x: new Date(2023, 6), y: 310000 },
        { x: new Date(2023, 7), y: 370000 },
        { x: new Date(2023, 8), y: 410000 },
        { x: new Date(2023, 9), y: 380000 },
        { x: new Date(2023, 10), y: 290000 },
        { x: new Date(2023, 11), y: 260000 }
      );
    }
    return defaultData;
  }


  toggleMonthInput() {
    this.showMonth = !this.showMonth;
  }

  toggleYearInput() {
    this.showYear = !this.showYear;
  }

  // chartOptions = {
	//   animationEnabled: true,
	//   title:{
	// 	text: "Biểu đồ thể hiện doanh thu của web theo năm"
	//   }, 
	//   axisY: {
	// 	title: "Số tiền",
	// 	valueFormatString: "#0,,.",
	// 	suffix: "VND"
	//   },
  //   axisX: {
  //     title: "Thời gian",
  //     interval: 1,
  //     intervalType: "month",
  //     valueFormatString: "MMMM", // Định dạng tháng
  // },
	//   data: [{
	// 	type: "splineArea",
	// 	color: "rgba(54,158,173,.7)",
	// 	xValueFormatString: "YYYY",
	// 	dataPoints: [
  //     { x: new Date(2023, 0), y: 250000 },
  //     { x: new Date(2023, 1), y: 210000 },
  //     { x: new Date(2023, 2), y: 300000 },
  //     { x: new Date(2023, 3), y: 350000 },
  //     { x: new Date(2023, 4), y: 320000 },
  //     { x: new Date(2023, 5), y: 280000 },
  //     { x: new Date(2023, 6), y: 310000 },
  //     { x: new Date(2023, 7), y: 370000 },
  //     { x: new Date(2023, 8), y: 410000 },
  //     { x: new Date(2023, 9), y: 380000 },
  //     { x: new Date(2023, 10), y: 290000 },
  //     { x: new Date(2023, 11), y: 260000 }
	// 	]
	//   }]
	// }	

  chartOptions = {
    animationEnabled: true,
    title:{
      text: "Biểu đồ thể hiện doanh thu của web theo năm"
    }, 
    axisY: {
      title: "Số tiền",
      valueFormatString: "#0,,.",
      suffix: "VND"
    },
    axisX: {
      title: "Thời gian",
      interval: 1,
      intervalType: "month",
      valueFormatString: "MMMM" // Định dạng tháng
    },
    data: [{
      type: "splineArea",
      color: "rgba(54,158,173,.7)",
      xValueFormatString: "YYYY",
      dataPoints:  [] as { x: Date, y: any }[]
    }]
  };






  getSumPrice() {
    this.tourService.getSumPrice().subscribe({
      next: (res) => {
        this.SumPrice = res;
        console.log('đã lấy getSumPrice : ', res);
      },
      error: (err) => {
        console.log('lỗi lấy getSumPrice ');
      },
    });
  }

  getCountTicket() {
    this.ticketservice.getCountTicket().subscribe({
      next: (res) => {
        this.countTicket = res;
        console.log('đã lấy count Ticket: ', res);
      },
      error: (err) => {
        console.log('lỗi lấy count Ticket');
      },
    });
  }

  getCountRevivews() {
    this.reviewservice.getCountReviews().subscribe({
      next: (res) => {
        this.countreviews = res;
        console.log('đã lấy count Revivews: ', res);
      },
      error: (err) => {
        console.log('lỗi lấy count Revivews');
      },
    });
  }

  getCountUserOnline() {
    this.userservice.getCountUserOnline().subscribe({
      next: (res) => {
        this.countUserOnline = res;
        console.log('đã lấy count UserOnline: ', res);
      },
      error: (err) => {
        console.log('lỗi lấy count UserOnline');
      },
    });
  }

  getCountUser() {
    this.userservice.getCountUser().subscribe({
      next: (res) => {
        this.countUser = res;
        console.log('đã lấy count User: ', res);
      },
      error: (err) => {
        console.log('lỗi lấy count User');
      },
    });
  }

  getCountDestination() {
    this.destinationService.getCountDestinations().subscribe({
      next: (res) => {
        this.countDestination = res;
        console.log('đã lấy count getAllDestinations: ', res);
      },
      error: (err) => {
        console.log('lỗi lấy count getAllDestinations');
      },
    });
  }

  getCounttour() {
    this.tourService.getCountTour().subscribe({
      next: (res) => {
        this.countTour = res;
        console.log('đã lấy count tour: ', res);
      },
      error: (err) => {
        console.log('lỗi lấy count tour');
      },
    });
  }
}
