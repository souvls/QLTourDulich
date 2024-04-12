import { Component } from '@angular/core';
import { TicketService } from '../../../service/ticket.service';
import { StorageService } from '../../../service/storage.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
  searchText = '';
  p: number = 1;
  id: number = 1;
  ListTicket: any[] = [];

  constructor(private ticketservice: TicketService, private storageService: StorageService){}
  ngOnInit(): void {
    this.id = this.storageService.getUser().user?.id;
this.getAllTicketByUserId();
  }

  getAllTicketByUserId(){
    this.ticketservice.getAllTicketByUserId(this.id).subscribe({
      next:(res)=>{
        this.ListTicket = res;
        console.log('list ticket theo id',  res);
      },error: err => {
        console.log('Lỗi tìm list ticket theo id', err);
      }
    })
  }
}
