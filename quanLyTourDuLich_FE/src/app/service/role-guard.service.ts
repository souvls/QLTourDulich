import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  isloggedIn : boolean = false;

  roles: any[] = [];

  constructor(private storageService:StorageService,private router: Router) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      const expectedRole = route.data['expectedRole'];
      this.isloggedIn = this.storageService.isLoggedIn();
      this.roles = this.storageService.getUser().user.roles
      if( this.isloggedIn == false || !this.roles.includes(expectedRole)){
        this.router.navigate(['login']);
        return false;
      }
      return true;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.canActivate(route, state);
  }
}