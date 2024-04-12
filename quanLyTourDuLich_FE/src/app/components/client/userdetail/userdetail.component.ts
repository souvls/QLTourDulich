import { Component } from '@angular/core';
import { StorageService } from '../../../service/storage.service';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrl: './userdetail.component.css'
})
export class UserdetailComponent {

  username: any;
  user :any;
  showForm!: boolean;


  updateForm:any = {
    setFirstname: null,
    setLastname: null,
    setEmail: null,
    setCountry: null,
    setState: null,
    setAddress: null,
    setPhone: null
  }

  changePasswordForm:any={
    oldPassword : null,
    newPassword: null
  }



  constructor(private userService: UserService, private storageService: StorageService){}

  ngOnInit(){
    this.username = this.storageService.getUser().user.username;
    const token = this.storageService.getUser();
    this.getUser();
  }

  getUser(){
    this.userService.getUser(this.username).subscribe({
      next: res=>{
        this.user = res;
        this.updateForm.firstname = res.firstname;
        this.updateForm.lastname = res.lastname;
        this.updateForm.email = res.email;
        this.updateForm.country = res.country;
        this.updateForm.state = res.state;
        this.updateForm.address = res.address;
        this.updateForm.phone = res.phone;
      },error : err =>{
        console.log(err);
      }
      
    })
  }

  updateProfile(){
    this.getUser();
    const{firstname,lastname,email,country,state,address,phone} = this.updateForm;
    this.userService.updateProfile(this.username,firstname,lastname,email,country,state,address,phone).subscribe({
      next: res =>{
        console.log("userService.getUser lấy thành công từ sver: ", this.user)
      },error: err=>{
        console.log(err);
      }
    })
  }

  changePasswordFunc(){
    const{oldPassword,newPassword} = this.changePasswordForm;
    this.userService.changePassword(this.username,oldPassword,newPassword).subscribe({
      next: res =>{
        this.getUser();
      },error: err =>{
        console.log(err);
      }
    }) 
  }


  isShowForm(){
    this.showForm = !this.showForm;
  }

}
