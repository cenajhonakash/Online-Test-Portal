import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { RazorPaymentService } from 'src/app/services/Payment/razor-payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false })
  paginator! : MatPaginator;  

  displayedColumns: string[] = ['razorOID','paymentID', 'order_date', 'amount','status','actions'];
  dataSource = new MatTableDataSource();

  amount:any;
  status:any = 0;
  userId:any=0;
  size:any=0;

  constructor(private _rs:RazorPaymentService, private _route:ActivatedRoute, private _snack:MatSnackBar) { }

  ngOnInit(): void {
    
    this.userId = this._route.snapshot.params['userID']
    if(this.userId != undefined){
      this._rs.getAllOrderDetailsOfUser(this.userId).subscribe((response:any)=>{

        this.size = response.length
        this.dataSource = new MatTableDataSource(response)
        this.dataSource.paginator = this.paginator

      },(error:any)=>{
        console.log(error)
        this._snack.open('Oops!!!..Error in Loading the payment details, Try after sometime.','DISMISS',{duration:4000})
      })
    }else{
      this.amount = this._route.snapshot.params['amount']//payment
      this.status = this._route.snapshot.params['payment']
      if(this._route.snapshot.params['payment'] == 1)
        this.status=1  
    }
   
   }

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  helpOnPayment(paymentId:any){
    console.log(this.userId + '/'+paymentId)
  }
}
