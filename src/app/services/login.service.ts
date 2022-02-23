import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

public loginStatusSubject = new Subject<boolean>();

  constructor(private http : HttpClient) { }

// get the current user login details from server
  public getCurrentUserFromBE(){
    return this.http.get(`${baseUrl}/currentUser`);
  }
  //generate token method
  public generateToken(loginData : any){
    return this.http.post(`${baseUrl}/generateToken`,loginData);
  }

  //login user : will set the token in browser localstorage
  public loginUserTokenSettingInLS(token :any , sKey:any){
    localStorage.setItem('token', token);
    localStorage.setItem('secret_key',sKey)
    //console.log(token);
   // this.loginStatusSubject.next(true);
    return true;
  }

  //isLogin : user is login or not
  public isLoggedIn(){
    let tokenStr = localStorage.getItem("token");
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    } 
    else{return true;}

  }

  //logout : to remove token from local storage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //get token from localstorage
  public getTokenFromLS(){  
    return localStorage.getItem("token");
  }

  //set userDetails : to make userDetails available till logout and don't give burden to backend server for getting current user details
  public setUserTillLogout(user : any){
    //console.log(user.userName+' '+user.authorities.authority);
    //console.log('Inside setUser'+JSON.stringify(user))
    //user.set('password',"")   
    user.password = ""
    localStorage.setItem('user', JSON.stringify(user));
  }

  //get userDetails
  public getCurrentUserFromLS(){
    let currentUuser = localStorage.getItem("user");
    if(currentUuser != null){
    //  console.log('Inside getCurrentUserFromLS' + currentUuser)
      return JSON.parse(currentUuser);
    }else{
      this.logout;
      return null;
    }
  }

  //get current User Roles like Admin or Normal
  public getUserRole(){
    let currentUser = this.getCurrentUserFromLS()
    //console.log('User Role = '+currentUser.authorities[0])
    return currentUser.authorities[0].authority;
  }
}
