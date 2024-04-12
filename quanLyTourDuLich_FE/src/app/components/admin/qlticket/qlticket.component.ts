import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TicketService } from '../../../service/ticket.service';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-qlticket',
  templateUrl: './qlticket.component.html',
  styleUrl: './qlticket.component.css'
})
export class QLticketComponent {
  searchText = '';

  showForm: boolean = false;
  showFormDelete: boolean = false;
  onUpdate: boolean = false;

  p: number = 1;

  listUser: any[] = [];
  listTicket: any[] = [];
  tour: any;

  choosenListTour: any[] = [];

  ticketForm: any = {
    id: null,
    description: null,
    name: null,
    participantsCount: null,
    startDate: null,
    status: null,
    user: null
  };



  showDropdown: boolean = false;

  constructor(
    private tickketService: TicketService,
    private userservice:UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getAllTicket();
    this.getAllUser();
  }

  selectUser(res: any) {
    this.ticketForm.user = res;
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  createTicket() {
    const { name, description, startDate, status, participantsCount, user } = this.ticketForm;
    console.log(this.ticketForm);
    this.tickketService
      .createTicket(name, description, startDate, status, participantsCount, user)
      .subscribe({
        next: (res) => {
          this.showForm = false;
          this.getAllTicket();
          this.openSnackBar('Thêm mới thành công', 'close');
        },
        error: (err) => {
          this.openSnackBar('Thêm mới thất bại! lỗi msg server', 'close');
        },
      });
  }

  updateTicket() {
    const {id,name, description, startDate, status, participantsCount, user } = this.ticketForm;
    console.log(this.ticketForm);
    this.tickketService
      .updateTicket(id, name, description, startDate, status, participantsCount, user)
      .subscribe({
        next: (res) => {
          this.showForm = false;
          this.getAllTicket();
          this.openSnackBar('cập nhật thành công', 'close');
        },
        error: (err) => {
          this.openSnackBar('cập nhật thất bại! lỗi msg server', 'close');
        },
      });
  }
  deleteTicket() {
    let id = this.ticketForm.id;
    this.tickketService.deleteTicket(id).subscribe({
      next: (res) => {
        this.getAllTicket();
        this.openSnackBar('đã đã xóa Ticket có id: ' + id, 'close');
        console.log('đã đã xóa Ticket có id: ', id);
        this.showFormDelete = false;
      },
      error: (err) => {
        this.openSnackBar('lỗi đã xóa Ticket có id: ' + id, 'close');
        console.log('lỗi đã xóa Ticket có id: ', id);
      },
    });
  }

  openUpdate(res: any) {
    this.showForm = true;
    this.onUpdate = true;
    this.ticketForm.id = res.id;
    this.ticketForm.name = res.name;
    this.ticketForm.description = res.description;
    this.ticketForm.participantsCount = res.participantsCount;
    this.ticketForm.startDate = res.startDate;
    this.ticketForm.status = res.status;
    this.ticketForm.user = res.user;
  }

  ondelete(res: any) {
    this.ticketForm.id = res.id;
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

  getAllTicket() {
    this.tickketService.getAllTicket().subscribe({
      next: (res) => {
        this.listTicket = res;
        console.log('đã lấy all ticket: ', res);
      },
      error: (err) => {
        console.log('lỗi lấy all ticket');
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

  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 10000; // Thời gian hiển thị thông báo (ms)
    config.panelClass = ['custom-snackbar']; // Sử dụng style custom
    this.snackBar.open(message, action, config);
  }
}
