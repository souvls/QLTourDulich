import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ImageService } from '../../../service/ImageService';
import { DestinationsService } from '../../../service/destinations.service';
import { TourService } from '../../../service/tour.service';

@Component({
  selector: 'app-qldestination',
  templateUrl: './qldestination.component.html',
  styleUrl: './qldestination.component.css'
})
export class QLdestinationComponent {
  searchText = '';

  p: number = 1;
  listDestination: any[] = [];
  listImage: any;

  selectedFiles?: FileList;
  currentFile?: File;

  disabled: boolean = true;

  onUpdate: boolean = false;
  showForm: boolean = false;
  showImage: boolean = false;
  showDelete: boolean = false;

  listImageChoosen: any = [];
  imageChoosen: any;

  DestinationForm: any = {
    id: null,
    describe: null,
    name: null,
    province: null,
    images: [],
  };

  constructor(
    private tourservice: TourService,
    private imgservice: ImageService,
    private snackBar: MatSnackBar,
    private destinationservice: DestinationsService
  ) {}

  ngOnInit() {
    this.getAllDestination();
    this.getListImage();
  }

  createDestination() {
    let data = this.listImageChoosen;
    data.forEach((res: any) => {
      if (Array.isArray(this.DestinationForm.images)) {
        this.DestinationForm.images.push(res.id);
      } else {
        this.DestinationForm.images = [res.id];
      }
    });
    const {
      describe,
      name,
      province,
      images,
    } = this.DestinationForm;
    console.log(this.DestinationForm);
    this.destinationservice
      .createDestination(
        describe,
        name,
        province,
        images,
      )
      .subscribe({
        next: (res) => {
          this.getAllDestination();
          this.showForm = false;
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
      if (Array.isArray(this.DestinationForm.images)) {
        this.DestinationForm.images.push(res.id);
      } else {
        this.DestinationForm.images = [res.id];
      }
    });
    const {
      id,
      describe,
      name,
      province,
      images,
    } = this.DestinationForm;
    console.log(this.DestinationForm);
    this.destinationservice
      .updateDestination(
        id,
        describe,
        name,
        province,
        images,
      )
      .subscribe({
        next: (res) => {
          this.getAllDestination();
          this.showForm = false;
          this.openSnackBar('cập nhật thành công thành công', 'close');
        },
        error: (err) => {
          this.openSnackBar('Thêm mới thất bại! lỗi msg server', 'close');
        },
      });
  }

  getAllDestination() {
    this.destinationservice.getListDestinations().subscribe({
      next: (res) => {
        this.listDestination = res;
        console.log('đã lấy all getAllDestinations: ', res);
      },
      error: (err) => {
        console.log('lỗi lấy all getAllDestinations');
      },
    });
  }

  deleteTour() {
    let id = this.DestinationForm.id;
    this.destinationservice.deleteDestination(id).subscribe({
      next: (res) => {
        this.getAllDestination();
        this.openSnackBar('đã đã xóa deleteDestination có id: ' + id, 'close');
        console.log('đã đã xóa deleteDestination có id: ', id);
        this.showDelete = false;
      },
      error: (err) => {
        this.openSnackBar('lỗi đã xóa deleteDestination có id: ' + id, 'close');
        console.log('lỗi đã xóa deleteDestination có id: ', id);
      },
    });
  }

  onChooseImage() {
    this.showImage = !this.showImage;
    this.disabled = true;
  }

  openNew() {
    this.onUpdate = false;
    this.showForm = !this.showForm;
    this.listImageChoosen = [];
    this.DestinationForm = {
      id: null,
      describe: null,
      name: null,
      province: null,
      images: [],
    };
  }

  openUpdate(data: any) {
    this.listImageChoosen = [];
    this.onUpdate = true;
    this.showForm = true;
    this.DestinationForm.id = data.id;
    this.DestinationForm.describe = data.describe;
    this.DestinationForm.name = data.name;
    this.DestinationForm.province = data.province;
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
    this.showImage = false;
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
    this.showDelete = true;
    this.DestinationForm.id = res.id;
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
