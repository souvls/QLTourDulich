import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ReviewsService } from '../../../service/reviews.service';

@Component({
  selector: 'app-qlreview',
  templateUrl: './qlreview.component.html',
  styleUrl: './qlreview.component.css'
})
export class QLreviewComponent {
  searchText = '';

  showForm: boolean = false;
  showFormDelete: boolean = false;
  onUpdate: boolean = false;

  p: number = 1;

  listReview: any[] = [];

  choosenListTour: any[] = [];

  reviewForm: any = {
    id: null,
    name: null,
    description: null,
    rating: null,
  };


  constructor(
    private reviewService: ReviewsService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.getAllReview();
  }


  updateService() {
    const {id,  name, description, rating } = this.reviewForm;
    console.log(this.reviewForm);
    this.reviewService
      .updateReview(id, name, description, rating)
      .subscribe({
        next: (res) => {
          this.showForm = false;
          this.getAllReview();
          this.openSnackBar('cập nhật thành công', 'close');
        },
        error: (err) => {
          this.openSnackBar('cập nhật thất bại! lỗi msg server', 'close');
        },
      });
  }

  deleteService() {
    let id = this.reviewForm.id;
    this.reviewService.deleteReview(id).subscribe({
      next: (res) => {
        this.getAllReview();
        this.openSnackBar('đã đã xóa Service có id: ' + id, 'close');
        console.log('đã đã xóa Service có id: ', id);
        this.showFormDelete = false;
        this.getAllReview();
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
    this.reviewForm.id = res.id;
    this.reviewForm.name = res.name;
    this.reviewForm.description = res.description;
    this.reviewForm.rating = res.rating;
  }

  ondelete(res: any) {
    this.reviewForm.id = res.id;
    this.showFormDelete = true;
  }

  openNew() {
    this.showForm = !this.showForm;
  }

  getAllReview() {
    this.reviewService.getAllReviews().subscribe({
      next: (res) => {
        this.listReview = res;
        console.log('đã lấy all getAllReviews: ', res);
      },
      error: (err) => {
        console.log('lỗi lấy all getAllReviews');
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
