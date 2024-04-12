import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import moment from 'moment';
import { ImageService } from '../../../service/ImageService';
import { TourService } from '../../../service/tour.service';

@Component({
  selector: 'app-qltour',
  templateUrl: './qltour.component.html',
  styleUrl: './qltour.component.css',
})
export class QLtourComponent {

  searchText = '';

  p: number = 1;
  listTour: any[] = [];
  listImage: any;

  selectedFiles?: FileList;
  currentFile?: File;

  disabled: boolean = true;

  onUpdate: boolean = false;
  showtourForm: boolean = false;
  showtourImage: boolean = false;
  showtourDelete: boolean = false;

  listImageChoosen: any = [];
  imageChoosen: any;

  tourForm: any = {
    id: null,
    endDate: null,
    name: null,
    participantsCount: null,
    price: null,
    startDate: null,
    status: null,
    destinations: null,
    images: [],
  };

  constructor(
    private tourservice: TourService,
    private imgservice: ImageService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getAllTour();
    this.getListImage();
  }

  createTour() {
    let data = this.listImageChoosen;
    data.forEach((res: any) => {
      if (Array.isArray(this.tourForm.images)) {
        this.tourForm.images.push(res.id);
      } else {
        this.tourForm.images = [res.id];
      }
    });
    const {
      name,
      price,
      startDate,
      endDate,
      status,
      participantsCount,
      destinations,
      images,
    } = this.tourForm;
    console.log(this.tourForm);
    this.tourservice
      .createTour(
        name,
        price,
        startDate,
        endDate,
        status,
        participantsCount,
        destinations,
        images
      )
      .subscribe({
        next: (res) => {
          this.getAllTour();
          this.showtourForm = false;
          this.openSnackBar('Thêm mới thành công', 'close');
        },
        error: (err) => {
          this.openSnackBar('Thêm mới thất bại! lỗi msg server', 'close');
        },
      });
  }

  updateTour() {
    let data = this.listImageChoosen;
    data.forEach((res: any) => {
      if (Array.isArray(this.tourForm.images)) {
        this.tourForm.images.push(res.id);
      } else {
        this.tourForm.images = [res.id];
      }
    });
    const {
      id,
      name,
      price,
      startDate,
      endDate,
      status,
      participantsCount,
      destinations,
      images,
    } = this.tourForm;
    console.log(this.tourForm);
    this.tourservice
      .updateTour(
        id,
        name,
        price,
        startDate,
        endDate,
        status,
        participantsCount,
        destinations,
        images
      )
      .subscribe({
        next: (res) => {
          this.getAllTour();
          this.showtourForm = false;
          this.openSnackBar('cập nhật thành công thành công', 'close');
        },
        error: (err) => {
          this.openSnackBar('Thêm mới thất bại! lỗi msg server', 'close');
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

  deleteTour() {
    let id = this.tourForm.id;
    this.tourservice.deleteTour(id).subscribe({
      next: (res) => {
        this.getAllTour();
        this.openSnackBar('đã đã xóa tour có id: ' + id, 'close');
        console.log('đã đã xóa tour có id: ', id);
        this.showtourDelete = false;
      },
      error: (err) => {
        this.openSnackBar('lỗi đã xóa tour có id: ' + id, 'close');
        console.log('lỗi đã xóa tour có id: ', id);
      },
    });
  }

  onChooseImage() {
    this.showtourImage = !this.showtourImage;
    this.disabled = true;
  }

  openNew() {
    this.onUpdate = false;
    this.showtourForm = !this.showtourForm;
    this.listImageChoosen = [];
    this.tourForm = {
      id: null,
      endDate: null,
      name: null,
      participantsCount: null,
      price: null,
      startDate: null,
      status: null,
      destinations: null,
      images: [],
    };
  }

  openUpdate(data: any) {
    this.listImageChoosen = [];
    this.onUpdate = true;
    this.showtourForm = true;
    this.tourForm.id = data.id;
    this.tourForm.name = data.name;
    this.tourForm.startDate = moment(data.startDate).format('YYYY-MM-DD');
    this.tourForm.endDate = moment(data.endDate).format('YYYY-MM-DD');
    this.tourForm.participantsCount = data.participantsCount;
    this.tourForm.price = data.price;
    this.tourForm.status = data.status;
    this.tourForm.description = data.description;
    data.images.forEach((res: any) => {
      this.listImageChoosen.push(res);
    });
  }

  uploadFile(event: any) {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.imgservice.upload(this.currentFile).subscribe({
          next: (res) => {
            this.currentFile = undefined;
            this.getListImage();
          },
          error: (err) => {},
        });
      }
      this.currentFile = undefined;
    }
  }

  chooseImage() {
    this.listImageChoosen.push(this.imageChoosen);
    console.log(this.listImageChoosen);
    this.showtourImage = false;
  }

  getListImage() {
    this.imgservice.getList().subscribe({
      next: (res) => {
        this.listImage = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  selectImage(event: any, res: any) {
    let data = document.querySelectorAll('.list-image img');
    console.log(data.item);
    data.forEach((i) => {
      i.classList.remove('choosen');
    });
    event.target.classList.toggle('choosen');
    this.imageChoosen = res;
    this.disabled = false;
  }

  ondelete(res: any) {
    this.showtourDelete = true;
    this.tourForm.id = res.id;
  }

  deleteImage(res: any) {
    this.listImageChoosen = this.listImageChoosen.filter(
      (item: any) => item.id !== res.id
    );
    console.log(this.listImageChoosen);
    this.disabled = false;
  }

  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 10000; // Thời gian hiển thị thông báo (ms)
    config.panelClass = ['custom-snackbar']; // Sử dụng style custom
    this.snackBar.open(message, action, config);
  }
}
