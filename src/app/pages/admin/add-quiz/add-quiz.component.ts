import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { QuizService } from 'src/app/services/quiz.service';
//import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})

export class AddQuizComponent implements OnInit {

 // public Editor = ClassicEditor;

  constructor(private snack:MatSnackBar, private _catS:CategoryServiceService, private qs:QuizService) { }
  quiz:any={active:true, title:'', about:'', max_marks:'', no_of_questions:'', category:{cid:'',}}
  category:any=[]
  ngOnInit(): void { 
    this._catS.categories().subscribe(
      (data:any)=>{
      this.category=data;
    },
    (error)=>{
      console.log(error)
      this.snack.open('Oops!!!..Some error occured in loading category.....try after some time','',{duration:2000})
    })
  }
  onFormSubmit(){
    if(this.quiz.title.trim()=='' || this.quiz.title == null||
    this.quiz.category==null || this.quiz.max_marks == null||
    this.quiz.max_marks.trim()=='' || this.quiz.no_of_questions == null|| this.quiz.no_of_questions.trim() == ''){
      this.snack.open('Fields marked with (*) is required','',{duration:2000})
      return;
    }

    this.qs.addQuiz(this.quiz).subscribe(
      (data)=>{
        this.snack.open('Added successfully!!!!','success',{duration:3000})
        this.quiz={active:true, title:'', about:'', max_marks:'', no_of_questions:'', category:{cid:'',}}
      },(error)=>{
        console.log(error)
        this.snack.open('Oops!!!...Error in adding quiz','error',{duration:2000})
      }
    )
}
}