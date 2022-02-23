import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage="";
  loginData = {userName : '', passWord :''}
  constructor(private snack : MatSnackBar,private loginService : LoginService, private router:Router) { }

  ngOnInit(): void {}
  loginFormSubmit(){
    console.log("login form submitted..");
    if(this.loginData.userName.trim() == '' || this.loginData.userName == '')
    {
      this.snack.open("Username is required!!!",'OK',{duration:3000,}); return;
    }
    if(this.loginData.passWord.trim() == '' || this.loginData.passWord == '')
    {
      this.snack.open("Password is required!!!",'OK',{duration:2000,}); return;
    }
    //request Tomcat Server to generate the token
    this.loginService.generateToken(this.loginData).subscribe(
      (data : any)=>{
        console.log('token successfully generated!!!!');
        console.log(data);
        this.loginService.loginUserTokenSettingInLS(data.token,data.razor_secretKey);
       // console.log(data.token)
        //this.loginService.setUserTillLogout
        this.loginService.getCurrentUserFromBE().subscribe(
          (user : any) => {
            this.loginService.setUserTillLogout(user);
            //console.log("current user : "+user);
            // redirect to component page as per role ADMIN or NORMAL
            if(this.loginService.getUserRole() == 'ADMIN'){
             // window.location.href = '/admin';
              this.router.navigate(['/']);
              this.loginService.loginStatusSubject.next(true);
            }else if(this.loginService.getUserRole() == 'NORMAL'){
             // window.location.href = '/user';
              this.router.navigate(['/']);
              this.loginService.loginStatusSubject.next(true);
              
            }else{
              this.loginService.logout();
            }
          },(error) =>{console.log('Failed user operation')}
        )
      },
      (error) => {
        //console.log('token generation failed');
        console.log(error)
        this.errorMessage = error.error.message
       // console.log(error.error.message);
       // if(error.error.message == "USER DISABLED")
         // console.log(" ===================")
        this.snack.open(error.error.message,'OK',{duration:5000})
       // this.snack.open(error.message,'',{duration:3000})
      }
    )
  }
}
