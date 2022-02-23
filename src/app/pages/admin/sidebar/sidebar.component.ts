import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {

  passChangeReq:boolean=false;
  user:any;
  category:any;
  constructor(private _nav:NavbarComponent, private _loginserv:LoginService,private _cs:CategoryServiceService,private _snack:MatSnackBar, private _route:Router) { }
  public logoutUser(){
    this._nav.logoutUser()
  }
  ngOnInit(): void {
    this.user = this._loginserv.getCurrentUserFromLS()
    //this.userid=this.user.userId.
    //console.log('inside sidebar '+this.user.userID)
   this._cs.categories().subscribe((data)=>{this.category = data},
    (error)=>{
      this._snack.open('Error!! loading data...Please try again later','Ok',{duration:3000})
      console.log(error)})
  }
  loadQuizOfSet(title:any, cid:any){
    this._route.navigate(['/admin/set/'+title+'/'+cid]).then(()=>{window.location.reload()});
  }
  passwordChange(cid:any){
    this.passChangeReq=true;
    this._route.navigate(['/admin/reset_password/'+true+'/'+cid])
  }
}
