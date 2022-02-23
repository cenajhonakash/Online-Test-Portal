import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryServiceService } from 'src/app/services/category-service.service';

@Component({
  selector: 'app-load-category',
  templateUrl: './load-category.component.html',
  styleUrls: ['./load-category.component.css']
})
export class LoadCategoryComponent implements OnInit {

  categories:any;
  constructor(private _category:CategoryServiceService, private snack:MatSnackBar) { }

  ngOnInit(): void {
    this._category.categories().subscribe((data)=>{
      this.categories=data
    },(error)=>{
      this.snack.open('Oops!!!....Error in loading Quiz Categories','',{duration:3500})
      console.log(error)
    })
  }
  // showQuizOfCategory(cid:any){
  //   this._category.getQuizzesOfcategory(cid).subscribe((data)=>{},(error)=>{})
  // }

}
