import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

constructor(private loginServ : LoginService, private router: Router, private navlogout:NavbarComponent){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.loginServ.isLoggedIn() && this.loginServ.getUserRole() == 'ADMIN'){return true;}
     
      this.navlogout.logoutUser();  
      //this.loginServ.logout()
      this.router.navigate(['login']);
      console.log('URL hit and try!!!!')
    return false;
  }
  
}
