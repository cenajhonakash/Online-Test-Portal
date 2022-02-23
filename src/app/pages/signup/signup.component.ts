import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

//signupForm :any = FormGroup;
 file:any;
  constructor(private userService : UserService, private snack : MatSnackBar, private fbuilder:FormBuilder) { }

  public user = {firstName: '',lastName: '',password: '',email: '',phone: '',imageURL: '',about: '',
  userName: ''}
  
  ngOnInit(): void {}

  formSubmit(val: any) {
   // alert('form submitted successfully');
   // console.log(this.user);
   this.user=val
    if(this.user.userName == '' || this.user.userName == null){
      //alert('User is required!!!');
      this.snack.open('username is required!!','done',{duration : 2000})
      return;
    }
    if(this.user.password == '' || this.user.password == null){
      //alert('User is required!!!');
      this.snack.open('username is required!!','done',{duration : 2000})
      return;
    }

    const formData = new FormData()
    formData.append('imageURL',this.file);
    formData.append('user',JSON.stringify(val))
   // console.log(val.imageURL)
  //  console.log(val)
  
    this.userService.addUser(formData).subscribe(
      (data) => {console.log(data); this.snack.open('Successfully registered!!','done',{duration : 3000})}, 
      (error) =>{console.log(error); this.snack.open('something went wrong!!','done',{duration : 3000})}
    )
  }

  chooseFile(event: any){
   this.file = event.target.files[0]
    //console.log(file)
   // this.user.imageURL = file;
  }

}
