import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private loginServ : LoginService, private router: Router, private navlogout:NavbarComponent){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.loginServ.isLoggedIn() && this.loginServ.getUserRole() == 'NORMAL'){return true;}
      this.navlogout.logoutUser();// reset (isUserLoggedIn & user) attribute in navbar.component.ts to avoid getting name & logout icon displayed while using URL HIT & TRY   
      //this.loginServ.logout   
      this.router.navigate(['login']);
      console.log('URL hit and try!!!!')
    return false;
  }  
}
