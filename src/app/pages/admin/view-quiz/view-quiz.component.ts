import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from 'src/app/services/quiz.service';
import { MatCardModule } from '@angular/material/card';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.css']
})
export class ViewQuizComponent implements OnInit {

  boo = false;
  quizzess:any=[]

  constructor(private snack:MatSnackBar,private _quizServ:QuizService, private load:NgxUiLoaderService) { }

  ngOnInit(): void {
    //this.load.start()
    this._quizServ.getAllQuiz().subscribe(
      (data:any)=>{
        this.boo=true;
        this.quizzess = data;      
      },
      (error)=>{
        console.log(error)
        this.snack.open('Error Loading data.....Try again!!','',{duration:3000})
      }
    )
  }

  deleteQuiz(qid:any){
    this.snack.open('are you sure you want to delete?','OK',{duration:4000}).onAction().subscribe(()=>{
      console.log('qid '+qid+' to be deletd')
      
      this._quizServ.deleteQuiz(qid).subscribe((data)=>{
        this.snack.open('Successfully deleted!!','',{duration:3000})
        this.quizzess = this.quizzess.filter((quiz:any)=> quiz.qid != qid);
      },(error)=>{
        console.log(error)
        this.snack.open('Oops!!!...Error in deleting quiz. Please try after sometime','',{duration:2000})
      })
    })
    
  }

}
