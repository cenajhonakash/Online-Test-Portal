import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditorBuild  from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  public Editor = ClassicEditorBuild;

  quizId=0
  quesId=0
  question:any;
  quizTitle:any;//
  constructor(private _actRout:ActivatedRoute, private _quesServ:QuestionService, private snack:MatSnackBar
    ,private _router:Router) { }

  ngOnInit(): void {
    this.quesId = this._actRout.snapshot.params['questionId']
    this.quizTitle = this._actRout.snapshot.params['title']
    this.quizId = this._actRout.snapshot.params['qid']
    this._quesServ.getQuestionFromQuesId(this.quesId).subscribe((data)=>{
      this.question=data
    },(error)=>{
      console.log(error)
      this.snack.open('Error Loading question...','Dismiss',{duration:3000})
    })
  }

  quesUpdateSubmit(){
    Swal.fire({
      title: 'Are you sure you want to update the question?',
      showDenyButton: true,
      //showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
      icon:'info',
    }).then((result) => {/* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if(this.question.content.trim()==''||this.question.option1.trim()==''||this.question.option2.trim()==''||
        this.question.option3.trim()==''||this.question.option4.trim()==''||this.question.answer.trim()==''){
          this.snack.open('Fields marked with (*) is required','',{duration:2000})
          return;
        }else{
          if(this.question.content.startsWith("<p>")){
            this.question.content=this.question.content.replace("<p>", "");
            this.question.content=this.question.content.replace("</p>", "");
          }
          this._quesServ.updateQuestion(this.question).subscribe((updatedQ)=>{
            this.question=updatedQ
            this.snack.open('Successfully updated!!!!','OK',{duration:2000})
            this._router.navigate(['/admin/viewQuestions/'+this.quizId+'/'+this.quizTitle])
          },(error)=>{
            console.log(error)
            this.snack.open('Error updating the question. Please try after sometime.','OK',{duration:2000})
          })
        }
      } else if (result.isDenied) {
        //Swal.fire('Test not taken.', '', 'info')
      }
    })
  }
}
