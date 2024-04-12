import { Injectable } from '@angular/core';

const USER_KEY = 'key_User';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  clean():void{
    window.sessionStorage.clear();
  }


  saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    console.log('trạng thái đăng nhập  ',this.isLoggedIn());
  }
  
  getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
  
  isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      console.log('trạng thái đăng nhập  true');
      return true;
    }
    console.log('trạng thái đăng nhập  false');
    return false;
  }
}
