import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AnyRecord } from 'dns';
import { LoginService } from 'src/app/services/login.service';
import { RazorPaymentService } from 'src/app/services/Payment/razor-payment.service';
import Swal from 'sweetalert2';
import * as $ from 'jQuery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  admin:boolean=false;
  candidate:boolean=false;
  paystatus:any=0;
  user:any;
  amount:any;
  constructor(private _ls:LoginService,private _snack:MatSnackBar,
    private _rs:RazorPaymentService,private _router:Router) { }

  ngOnInit(): void {
    this.user=this._ls.getCurrentUserFromLS()
    if(this._ls.getCurrentUserFromLS().authorities[0].authority == 'NORMAL')
      this.candidate=true
    if(this._ls.getCurrentUserFromLS().authorities[0].authority == 'ADMIN')
      this.admin=true
  }

   pay(data:any){
    // console.log(data)
     this.amount = data.money
     var thisobj=this;
     if(this.amount == ''){
      thisobj._snack.open('Please enter the amount...','OK',{duration:3000})
       return;
     }
     console.log(localStorage.getItem("razor_secretKey"))
     thisobj._rs.generateOrder(data).subscribe((data : any)=>{
       //console.log(data)
       if(data.status =='created'){  
       let options = {
         "key": localStorage.getItem("razor_secretKey"),  //Enter the Key ID generated from the Dashboard
         "amount": data.amount, //Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
         "currency": "INR",
         "name": "CBSE",
         "description": "Transaction",
         "image": "http:127.0.0.1:8887/Logo.jpg",
         "order_id": data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
         "handler": function (response : any){
           console.log('razorpay_payment_id'+response.razorpay_payment_id)
           console.log('razorpay_order_id'+response.razorpay_order_id)
           console.log('razorpay_signature'+response.razorpay_signature)
          const jsonObj = {
            "razorpay_payment_id" : response.razorpay_payment_id,
            "razorpay_order_id":response.razorpay_order_id,
            "status": 'paid'
          };
           thisobj.paystatus = 1;
           updatePayment(jsonObj,thisobj);
          //  Swal.fire('Success!!!','Thank you for the help','success').then(()=>{
          //   redirectFunc('success',thisobj, thisobj.amount)
          //  })
         },
         "prefill": {
             "name": "Akash Kumar",
             "email": "dev.ak.1996123@gmail.com",
             "contact": "8789450967"
         },
         "notes": {
             "address": "CBSE Office, New Delhi"
         },
         "theme": {
             "color": "#3399cc"
         }
       };
  
       var rzp1 = new this._rs.nativewindow.Razorpay(options);
       rzp1.on('payment.failed', function (response : any){
        console.log('code = '+response.error.code);
        console.log('description = '+response.error.description);
        console.log('source = '+response.error.source);
        console.log('step = '+response.error.step);
        console.log('reason = '+response.error.reason);
        console.log('order_id = '+response.error.metadata.order_id);
        console.log('payment_id = '+response.error.metadata.payment_id);
        Swal.fire('OOps!!!','Payment failed due to gateway issue','error')});
       rzp1.open();
     }
     },(error)=>{
       console.log(error)
       Swal.fire('Oops!!!','Payment failed due to application issue','error').then((x)=>{
       if(this.user.authorities[0].authority == 'NORMAL')
        thisobj._router.navigate(['user/thank-you/'+data.money+'/'+this.paystatus])
       else
        thisobj._router.navigate(['admin/thank-you/'+data.money+'/'+this.paystatus])
       })
     })
   }
 }

 function updatePayment(model : any, thisObj:any) {
   console.log('Inside updatePayment')
   //console.log(model)
  thisObj._rs.updateGeneratedOrder(model).subscribe((response : any)=>{
    console.log(response)
    Swal.fire('Thank You!!!','Payment has been captured and updated.','success')
    redirectFunc("1",thisObj,thisObj.amount)
  },(error: any)=>{
    console.log(error)
    Swal.fire('Oops!!','Payment has been captured but was not able to update in db but donot worry we will reach out to you shortly.','error').then(
      ()=>{ redirectFunc("0",thisObj,thisObj.amount)}
    )
  })
 }
 
 function redirectFunc(status: string,thisobj :any, amount:any){
  if(thisobj.candidate)
    window.location.href = 'user/thank-you/'+amount+'/'+status
     // thisobj._router.navigate(['user/thank-you/'+amount+'/'+status])
  else
      //thisobj._router.navigate(['admin/thank-you/'+amount+'/'+status])
      window.location.href = 'admin/thank-you/'+amount+'/'+status
 }

