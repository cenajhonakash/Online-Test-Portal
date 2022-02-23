import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {
  qid=0
  title=''
  questions:any=[]
  constructor(private _router:ActivatedRoute, private _QuesServ:QuestionService, 
    private snack:MatSnackBar, private route:Router) { }

  ngOnInit(): void {
    this.qid =this._router.snapshot.params['qid']
    this.title =this._router.snapshot.params['title']
    console.log(this.qid+""+this.title)
    
    this._QuesServ.getQuestionsOf_quiz(this.qid).subscribe((data)=>{
      console.log(data)
      this.questions=data;
    },(error)=>{
      console.log(error)
    })
  }

  deleteQuestion(quesId:any){
    this.snack.open('Do you want to delete?','Ok',{duration:4500}).onAction().subscribe(
      ()=>{
        this._QuesServ.deleteQuestion(quesId).subscribe((data)=>{
          this.snack.open('Successfully deleted','Ok',{duration:3000})
          this.questions = this.questions.filter((q:any)=>q.quesId != quesId)
          this.route.navigate(['/admin/viewQuestions/'+ this.qid +'/'+ this.title])
        })
      }
    )
  }

  updateQuestion(quesId:any){
    
  }
}
