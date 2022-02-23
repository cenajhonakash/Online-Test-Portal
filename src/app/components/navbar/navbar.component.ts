import { Component, Injectable, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class NavbarComponent implements OnInit {

  isUserLoggedIn=false;
  user:any=null;
  constructor(public loginService:LoginService) { }

  public logoutUser(){ 
    
    this.isUserLoggedIn=false
    this.user=null
    this.loginService.logout();
    //window.location.reload
    window.location.href = '/login';
   // this.router.navigate(['login']);
  }
  ngOnInit(): void {
    this.isUserLoggedIn=this.loginService.isLoggedIn();
    this.user=this.loginService.getCurrentUserFromLS();

    this.loginService.loginStatusSubject.asObservable().subscribe(
      (data)=>{
        this.isUserLoggedIn=this.loginService.isLoggedIn();
        this.user=this.loginService.getCurrentUserFromLS();
      }
    );
  }
}
