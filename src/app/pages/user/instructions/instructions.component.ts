import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})

export class InstructionsComponent implements OnInit {

  qId:any=0;
  quiz:any;
  quesSize=0
  static question: any;
  constructor(private _router:ActivatedRoute, private _Qs:QuizService, private _snack:MatSnackBar, 
    private route:Router, private _quesService:QuestionService) { }

  ngOnInit(): void {
  this.qId = this._router.snapshot.params['qid']
  console.log('qId = '+this.qId)
  this._Qs.getAQuiz(this.qId).subscribe((Q)=>{
    this.quiz=Q
  },
    (error)=>{console.log(error); this._snack.open('Error Loading the quiz. Try later...','Dismiss',{duration:3000})})
  this._quesService.getQuestionsOf_quizForCandidate(this.qId).subscribe((q:any)=>{
        InstructionsComponent.question = q
        console.log(InstructionsComponent.question)
        this.quesSize = q.length
        console.log('question size = '+this.quesSize)
      },(error)=>{
        console.log('Getting below error in getting question'+error)
      })
  }

  startTest(){
    Swal.fire({
      title: 'Are you sure to start the test?',
      showDenyButton: true,
      //showCancelButton: true,
      confirmButtonText: 'Start',
      denyButtonText: `No`,
      icon:'info',
    }).then((result) => {/* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.route.navigate(['/start-test/'+this.qId])
      } else if (result.isDenied) {
        Swal.fire('Test not taken.', '', 'info')
      }
    })
  }
}
