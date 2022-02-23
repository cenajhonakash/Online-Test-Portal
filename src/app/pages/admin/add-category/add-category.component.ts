import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryServiceService } from 'src/app/services/category-service.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  cat:any={title:'',about:''}
  constructor(private cs:CategoryServiceService, private snack:MatSnackBar) { }

  ngOnInit(): void {}

  onFormSubmit(){
    if(this.cat.title.trim()=='' || this.cat.title == null){
      this.snack.open('title is required','',{duration:2000})
      return;
    }
    if(this.cat.about.trim().length<10){
      this.snack.open('please describe in few more words','',{duration:2000})
      return;
    }
    this.cs.add(this.cat).subscribe(
      (data:any)=>{
        this.cat.title=''
        this.cat.about=''
        this.snack.open('Added successfully!!!!','success',{duration:3000})
      },
      (error)=>{
        console.log(error)
        this.snack.open('Oops!!!...Error in adding category','error',{duration:2000})
      }
    )
  }

}
