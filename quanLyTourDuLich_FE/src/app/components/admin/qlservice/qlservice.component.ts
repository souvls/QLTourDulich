import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ServiceService } from '../../../service/service.service';
import { TourService } from '../../../service/tour.service';

@Component({
  selector: 'app-qlservice',
  templateUrl: './qlservice.component.html',
  styleUrl: './qlservice.component.css',
})
export class QLserviceComponent {
  
  searchText = '';

  showForm: boolean = false;
  showFormDelete: boolean = false;
  onUpdate: boolean = false;
  showSearch: boolean = false;

  p: number = 1;

  listService: any[] = [];
  listTour: any[] = [];
  listTourFilter: any[] = [];
  tour: any;

  choosenListTour: any[] = [];

  serviceForm: any = {
    id: null,
    description: null,
    price: null,
    idTour: [],
  };

  showDropdown: boolean = false;

  constructor(
    private service: ServiceService,
    private tourservice: TourService,
    private snackBar: MatSnackBar,
    private serviceservice: ServiceService
  ) {}

  ngOnInit() {
    this.getAllService();
    this.getAllTour();
  }

  filterList(event: Event): any {
    const target = document.getElementById(
      'inputValueFilter'
    ) as HTMLInputElement;
    const filterValue = target.value.trim(); // Trim dấu cách thừa

    if (filterValue) {
      this.showDropdown = false;
      this.showSearch = true;
    } else {
      this.showDropdown = true;
      this.showSearch = false;
    }

    const filter = this.listTour.filter((item: any) => {
      // Sử dụng indexOf hoặc includes để kiểm tra chuỗi
      return item.name.toLowerCase().includes(filterValue.toLowerCase());
    });

    this.listTourFilter = filter;
    console.log(filter);
    return filter;
  }

  selectTour(res: any) {
    this.choosenListTour.push(res);
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
    if (this.showDropdown) {
      this.listTourFilter = this.listTour;
    }
  }

  createService() {
    let data = this.choosenListTour;
    data.forEach((res: any) => {
      if (Array.isArray(this.serviceForm.idTour)) {
        this.serviceForm.idTour.push(res.id);
      } else {
        this.serviceForm.idTour = [res.id];
      }
    });

    const { name, description, price, idTour } = this.serviceForm;
    console.log(this.serviceForm);
    this.serviceservice
      .createService(name, description, price, idTour)
      .subscribe({
        next: (res) => {
          this.showForm = false;
          this.getAllService();
          this.serviceForm.idTour = [];
          this.openSnackBar('Thêm mới thành công', 'close');
        },
        error: (err) => {
          this.openSnackBar('Thêm mới thất bại! lỗi msg server', 'close');
        },
      });
  }

  updateService() {
    let data = this.choosenListTour;
    data.forEach((res: any) => {
      if (Array.isArray(this.serviceForm.idTour)) {
        this.serviceForm.idTour.push(res.id);
      } else {
        this.serviceForm.idTour = [res.id];
      }
    });

    const {id, name, description, price, idTour } = this.serviceForm;
    console.log(this.serviceForm);
    this.serviceservice
      .updateService(id, name, description, price, idTour)
      .subscribe({
        next: (res) => {
          this.showForm = false;
          this.getAllService();
          this.serviceForm.idTour = [];
          this.openSnackBar('cập nhật thành công', 'close');
        },
        error: (err) => {
          this.openSnackBar('cập nhật thất bại! lỗi msg server', 'close');
        },
      });
  }
  deleteService() {
    let id = this.serviceForm.id;
    this.serviceservice.deleteService(id).subscribe({
      next: (res) => {
        this.getAllTour();
        this.openSnackBar('đã đã xóa Service có id: ' + id, 'close');
        console.log('đã đã xóa Service có id: ', id);
        this.showFormDelete = false;
        this.getAllService();
      },
      error: (err) => {
        this.openSnackBar('lỗi đã xóa Service có id: ' + id, 'close');
        console.log('lỗi đã xóa Service có id: ', id);
      },
    });
  }

  openUpdate(res: any) {
    this.showForm = true;
    this.onUpdate = true;
    this.serviceForm.id = res.id;
    this.serviceForm.name = res.name;
    this.serviceForm.description = res.description;
    this.serviceForm.price = res.price;
    this.choosenListTour = [];
    this.choosenListTour.push(res.tour);
  }

  ondelete(res: any) {
    this.serviceForm.id = res.id;
    this.showFormDelete = true;
  }

  openNew() {
    this.showForm = !this.showForm;
  }

  deleteTour(res: any) {
    this.choosenListTour = this.choosenListTour.filter(
      (item: any) => item.id !== res.id
    );
    console.log(this.choosenListTour);
  }

  getAllService() {
    this.service.getAllService().subscribe({
      next: (res) => {
        this.listService = res;
        console.log('đã lấy all service: ', res);
      },
      error: (err) => {
        console.log('lỗi lấy all service');
      },
    });
  }

  getAllTour() {
    this.tourservice.getAllTour().subscribe({
      next: (res) => {
        this.listTour = res;
        console.log('đã lấy all tour: ', res);
      },
      error: (err) => {
        console.log('lỗi lấy all tour');
      },
    });
  }

  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 10000; // Thời gian hiển thị thông báo (ms)
    config.panelClass = ['custom-snackbar']; // Sử dụng style custom
    this.snackBar.open(message, action, config);
  }
}
