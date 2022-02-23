import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent implements OnInit {

  amount:any;
  status:any = 0;

  constructor(private _route:ActivatedRoute) { }

  ngOnInit(): void {
    
      this.amount = this._route.snapshot.params['amount']//payment
      //this.status = this._route.snapshot.params['payment']
      if(this._route.snapshot.params['payment'] == 1)
        this.status=1
      else
         this.status=0

      console.log(this.status)
  }

}
