import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryServiceService } from 'src/app/services/category-service.service';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {

  boo = false;
  categories:any=[]
  constructor(private _category:CategoryServiceService, private snack:MatSnackBar) { }

  ngOnInit(): void {
    this._category.categories().subscribe(
      (data:any)=>{
        this.boo=true;
        this.categories = data;
        console.log(data)
      },
      (error)=>{
        console.log(error)
        this.snack.open('Error Loading data.....Try again!!','',{duration:3000})
      }
    )
  }

}
