import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }//part is autowiring dependency and importing under UserService class //http is calling our backend service
  //add user
  public addUser(user : any){
    return this.http.post(`${baseUrl}/user/`,user);
  }

  public updateUser(user : any, userID:any){
    return this.http.put(`${baseUrl}/user/update/${userID}`,user);
  }

  public changeUserPassword(userID : any, passModule:any){
    return this.http.put(`${baseUrl}/user/reset-password/${userID}`,passModule);
  }
  public updateCandidate(userID:any){
    return this.http.put(`${baseUrl}/user/update-Candidate/${userID}`,"");
  }
  public getAllNormalUser(userID:any){
    return this.http.get(`${baseUrl}/user/${userID}/getCandidates`);
  }
}
