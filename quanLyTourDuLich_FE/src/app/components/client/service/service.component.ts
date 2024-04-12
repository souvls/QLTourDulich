import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../../service/service.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrl: './service.component.css',
})
export class ServiceComponent {

  p: number = 1;
  listService: any[] = [];
  service:  any;
  ischeckNotList: boolean = false;
  id: number = 0;
  constructor(private route: ActivatedRoute, private router: Router, private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.route.params.subscribe(params => {
      const id = params['id'];

      if (id) {
        console.log('this.getServiceById();');
        this.getServiceById();
        this.ischeckNotList = true;
      } else {
        console.log('this.getAllService();');
        this.getAllService();
        this.ischeckNotList = false;
      }
    });
  }

  getAllServiceInTourById(){
    this.serviceService.getAllServiceInTourById(this.id).subscribe({
      next:(res)=>{
        this.listService = res;
      },error: err => {
        console.log('Lỗi tìm service theo id', err);
      }
    })
  }

  getServiceById(){
    this.serviceService.getServiceById(this.id).subscribe({
      next:(res)=>{
        console.log(res);
        this.service = res;
      },error: err => {
        console.log('Lỗi tìm service theo id', err);
      }
    })
  }


  getAllService() {
    this.serviceService.getAllService().subscribe({
      next: (res) => {
        this.listService = res;
      },      error: err => {
        console.log('Lỗi tìm all service', err);
      }
    });
  }
}
