import { Component, OnInit } from '@angular/core';
//import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
//import {ViewChild} from '@angular/core';
//import {MatAccordion} from '@angular/material/expansion';
//import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { AppComponent } from 'src/app/app.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { SidebarComponent } from '../admin/sidebar/sidebar.component';
//import * as $ from 'jquery';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  //@ViewChild(MatAccordion) accordion: MatAccordion;
  
  //inputFormControl = new FormControl({ value: null, disabled: true });
  countToggle:any=0;
  passEnabled=false;
  user:any;email:any;fname:any;lname:any;phone:any;about:any;uname:any;
  constructor(private _ls:LoginService, private _us:UserService, private _snack:MatSnackBar,
    private _route:Router, private _router:ActivatedRoute, private _loginServ:LoginService) { }

  ngOnInit(): void {
   if(this._router.snapshot.params['check']){this.passEnabled=true}else{this.passEnabled=false;}
    this.user = this._ls.getCurrentUserFromLS()
    this.email = this.user.email;
    this.phone = this.user.phone;this.about = this.user.about;this.uname=this.user.userName;
  }
  formSubmit(data:any){
    Swal.fire({
      title:'Are you sure to update your profile?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
      icon:'info',
    }).then((result) => {/* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
      //  console.log(data)
        if(this.passEnabled){
          console.log(data)
          
          if(data.old_pass == ''||data.new_pass==''||data.re_entered==''){
            this._snack.open('All fields are mandatory.','OK',{duration:4000})
            return
        }
          if(data.re_entered != data.new_pass){
            this._snack.open('New Password & Re-entered password must match.','OK',{duration:4000})
            return;
          }
            if(data.old_pass == data.new_pass){
              this._snack.open('Please avoid using old password.','OK',{duration:4000})
              return
          }
          const formData = new FormData()
          formData.append('passChangeModule',JSON.stringify(data))
          this._us.changeUserPassword(this.user.userID,formData).subscribe((x)=>{
            this._snack.open('Password successfully changed!!!!!','OK',{duration:4000})
            this._loginServ.logout()
          },(error)=>{
            console.log(error)
            this._snack.open('Error!!!...Please try after sometime.','OK',{duration:4000})
          })
        }else{
          this._us.updateUser(data, this._router.snapshot.params['userID']).subscribe((newUser:any)=>{
            //console.log(newUser)
            this._loginServ.setUserTillLogout(newUser);
            this._snack.open('Successfully updated!!!!','Ok',{duration:3000})
            this._route.navigate(newUser.authorities[0].authority=='NORMAL'?['user/profile']:['admin/profile'])
          },(error)=>{
            this._snack.open('Some internal error occured!!!!','Dismiss',{duration:3000})
           // console.log(data)
            console.log(error)
          })
        }
       
      } else if (result.isDenied) {}
    })
  }

  onChange(){
    this.countToggle++
    //this.passEnabled=true;
    this.ngOnInit()
  }
}
