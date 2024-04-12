import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ImageService } from '../../../service/ImageService';
import { StorageService } from '../../../service/storage.service';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-qluser',
  templateUrl: './qluser.component.html',
  styleUrl: './qluser.component.css'
})
export class QluserComponent {
  searchText = '';

  p: number = 1;
  listUser: any[] = [];
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

  UserForm: any = {
    id:null,
    Address: null,
    Country: null,
    Email: null,
    Firstname: null,
    Lastname: null,
    Password: null,
    Phone: null,
    State: null,
    Username: null,
    verificationcode: null,
    images: [],
  };

  constructor(
    private userservice: UserService,
    private imgservice: ImageService,
    private snackBar: MatSnackBar,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.getAllUser();
    this.getListImage();
  }

  createUser() {
    let data = this.listImageChoosen;
    data.forEach((res: any) => {
      if (Array.isArray(this.UserForm.images)) {
        this.UserForm.images.push(res.id);
      } else {
        this.UserForm.images = [res.id];
      }
    });
    const {
      Address,
      Country,
      Email,
      Firstname,
      Lastname,
      Password,
      Phone,
      State,
      Username,
      images,
    } = this.UserForm;
    console.log(this.UserForm);
    this.userservice
      .createUser(
        Address,
        Country,
        Email,
        Firstname,
        Lastname,
        Password,
        Phone,
        State,
        Username,
        images,
      )
      .subscribe({
        next: (res) => {
          this.getAllUser();
          this.showForm = false;
          this.openSnackBar('Thêm mới thành công', 'close');
        },
        error: (err) => {
          this.openSnackBar('Thêm mới thất bại! lỗi msg server', 'close');
        },
      });
  }

  updateUser() {
    let data = this.listImageChoosen;
    data.forEach((res: any) => {
      if (Array.isArray(this.UserForm.images)) {
        this.UserForm.images.push(res.id);
      } else {
        this.UserForm.images = [res.id];
      }
    });
    const {
      id,
      Address,
      Country,
      Email,
      Firstname,
      Lastname,
      Password,
      Phone,
      State,
      Username,
      images,
    } = this.UserForm;
    console.log(this.UserForm);
    this.userservice
      .updateUser(
        id,
        Address,
        Country,
        Email,
        Firstname,
        Lastname,
        Password,
        Phone,
        State,
        Username,
        images,
      )
      .subscribe({
        next: (res) => {
          this.getAllUser();
          this.showForm = false;
          this.openSnackBar('cập nhật thành công thành công', 'close');
        },
        error: (err) => {
          this.openSnackBar('Thêm mới thất bại! lỗi msg server', 'close');
        },
      });
  }

  getAllUser() {
    this.userservice.getAllUser().subscribe({
      next: (res) => {
        this.listUser = res;
        console.log('đã lấy all user: ', res);
      },
      error: (err) => {
        console.log('lỗi lấy all user');
      },
    });
  }

  deleteUser() {
    let id = this.UserForm.id;
    this.userservice.deleteUser(id).subscribe({
      next: (res) => {
        this.getAllUser();
        this.openSnackBar('đã đã xóa User có id: ' + id, 'close');
        console.log('đã đã xóa User có id: ', id);
        this.showDelete = false;
      },
      error: (err) => {
        this.openSnackBar('lỗi đã xóa User có id: ' + id, 'close');
        console.log('lỗi đã xóa User có id: ', id);
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
    this.UserForm = {
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
    this.UserForm.id = data.id;
    this.UserForm.Address = data.Address;
    this.UserForm.Country = data.Country;
    this.UserForm.Email = data.Email;
    this.UserForm.Firstname = data.Firstname;
    this.UserForm.Lastname = data.Lastname;
    this.UserForm.Password = data.Password;
    this.UserForm.Phone = data.Phone;
    this.UserForm.State = data.State;
    this.UserForm.Username = data.Username;
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
    this.UserForm.id = res.id;
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
