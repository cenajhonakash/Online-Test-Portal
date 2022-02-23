import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';


function _window() : any{
  return window;
}


@Injectable({
  providedIn: 'root'
})
export class RazorPaymentService {

 // Razorpay: any;

  get nativewindow() : any{
    return _window();
  }
  constructor(private http : HttpClient) { }

  public generateOrder(amount:any){
    return this.http.post(`${baseUrl}/razorPay-gateway/create-order/`,amount);
  }

  public updateGeneratedOrder(order:any){
    return this.http.put(`${baseUrl}/razorPay-gateway/update-order/`,order);
  }

  public getAllOrderDetailsOfUser(userID:any){
    return this.http.get(`${baseUrl}/razorPay-gateway/getPaymentDetails/${userID}`)
  }
}
