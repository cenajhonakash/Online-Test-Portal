import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  quizid = 0
  quiz:any
  category:any=[]
  constructor(private _route:ActivatedRoute, private qs:QuizService,private _catS:CategoryServiceService, 
    private snack:MatSnackBar, private route:Router) { }

  ngOnInit(): void {
   
    this.quizid = this._route.snapshot.params['qid'];
    console.log("quizid ="+this.quizid);
    if(this.quizid != null || this.quizid != ''){
      this.qs.getAQuiz(this.quizid).subscribe((data)=>{
        this.quiz=data
        console.log(this.quiz)
        this._catS.categories().subscribe(
          (data:any)=>{
          this.category=data;
        },
        (error)=>{
          console.log(error)
          this.snack.open('Oops!!!..Some error occured in loading category.....try after some time','',{duration:2000})
        })
      },(error)=>{
        console.log(error)
      })
    }
    else{
      this.snack.open('Error Getting the quiz id from server!!!!.. Try after sometime','OK',{duration:3000})
    }
    //alert(this.quizid)   
  }

  onUpdateSubmit(){
    if(this.quiz.title.trim()=='' || this.quiz.title == null||
    this.quiz.category==null || this.quiz.max_marks == null||
    this.quiz.max_marks.trim()=='' || this.quiz.no_of_questions == null|| this.quiz.no_of_questions.trim() == ''){
      this.snack.open('Fields marked with (*) is required','',{duration:2000})
      return;
    }
    this.snack.open('Are you sure you want to update?','Ok',{duration:5000}).onAction().subscribe((data)=>{
      console.log(this.quiz)
      this.qs.updateQuiz(this.quiz).subscribe((data)=>{
        this.snack.open('Successfully Updated!!!!!!','',{duration:2000})
        this.route.navigate(['/admin/quizzes'])
          this.quiz={active:true, title:'', about:'', max_marks:'', no_of_questions:'', category:{cid:'',}}
      },(error)=>{
        this.snack.open('Oops!!!....Error occured in updating','fail',{duration:4000})
        console.log(error)
      })
    })
    
  }

}
