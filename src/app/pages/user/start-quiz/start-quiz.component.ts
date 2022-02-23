import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
//import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { QuestionService } from 'src/app/services/question.service';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { InstructionsComponent } from '../instructions/instructions.component';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})

export class StartQuizComponent implements OnInit {

  score=0;
  correctAnswer=0;
  unitMarks=0;
  attempted=0;
  quetions:any;
  qID:any;
  quiz_maxMarks=0;
  submitted = false;
  totalQues=0;
  test_timer:any;
  constructor(private _snap:ActivatedRoute, private _questServ:QuestionService, private snack:MatSnackBar,
    @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    console.log('inside startQuiz')
   this.qID = this._snap.snapshot.params['qid']
   this.quetions = InstructionsComponent.question
   if(this.quetions.length>0){
    this.test_timer = this.quetions.length * 1 * 60;
    console.log("timer val = "+this.test_timer)
     this.totalQues = this.quetions.length
     this.quiz_maxMarks = this.quetions[0].quiz.max_marks;
     this.unitMarks = this.quiz_maxMarks/this.totalQues;
     this.startTimer()
     this.quetions.forEach((element:any) => {element['givenAnswer']=''});
   }else{this.snack.open('Not able to load the questions....','',{duration:3000})}
    // this._questServ.getQuestionsOf_quizForCandidate(this.qID).subscribe(
    //   (ques)=>{
    //     this.quetions=ques
    //    // this.disableRightClick()
    //    this.test_timer = this.quetions.length * 1 * 60;
    //    console.log("timer val = "+this.test_timer)
    //     this.totalQues = this.quetions.length
    //     this.quiz_maxMarks = this.quetions[0].quiz.max_marks;
    //     this.unitMarks = this.quiz_maxMarks/this.totalQues;
    //     this.startTimer()
    //     this.quetions.forEach((element:any) => {element['givenAnswer']=''});
    //   },(error)=>{console.log(error); this.snack.open('Not able to load the questions....','',{duration:3000})}
    // )
  }

  disableRightClick() {
    this.document.addEventListener('contextmenu', (event) =>
      event.preventDefault()
    );
  }
  sumbitQuiz(){
    Swal.fire({
      title: 'Are you sure to submit the test?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      denyButtonText: `No`,
      icon:'info',
    }).then((result) => {/* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.evalQuiz()
      } else if (result.isDenied) {
        //Swal.fire('Test not taken.', '', 'info')
      }
    })
  }

  startTimer(){
    let t = window.setInterval(()=>{
      if(this.test_timer<=0){
        this.evalQuiz()
        clearInterval(t)
      }else{this.test_timer--;}
    },1000)
  }

  formatTimer(){
    let mm=Math.floor(this.test_timer/60)
    let ss=this.test_timer-mm*60
    return `${mm} min : ${ss} sec`
  }
  evalQuiz(){
    this.submitted=true
    this.quetions.forEach((q:any) => {
      if(q.givenAnswer != '' && q.givenAnswer == q.answer){this.correctAnswer++}
      if(q.givenAnswer.trim() != ''){this.attempted++}
    });
    this.score = this.correctAnswer * this.unitMarks
  }
}


