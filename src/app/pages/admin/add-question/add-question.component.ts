import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { QuestionService } from 'src/app/services/question.service';
//import * as $ from 'jquery';
import * as ClassicEditorBuild  from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

 public Editor = ClassicEditorBuild;

  qId:any=0
  title:any=''
  question:any={quiz:{},content:'',option1:'',option2:'',option3:'',option4:'',answer:'',image:'',}
  constructor(private _route:ActivatedRoute, private snack:MatSnackBar, private quesS:QuestionService,
     private route:Router) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid']
    this.title = this._route.snapshot.params['title']
    this.question.quiz['qid'] = this.qId
    console.log(this.qId)
  }

  addQuestionFormSubmit(){
    if(this.question.content.trim()==''||this.question.option1.trim()==''||this.question.option2.trim()==''||
    this.question.option3.trim()==''||this.question.option4.trim()==''||this.question.answer==''){
      this.snack.open('Please fill the fields marked with *','Dismiss',{duration:3000})
      return;
    }
    if(this.question.content.startsWith("<p>")){
      this.question.content=this.question.content.replace("<p>", "");
      this.question.content=this.question.content.replace("</p>", "");
    }
    
    this.quesS.addNewQuestion(this.question).subscribe((data)=>{
      this.snack.open('Successfully Added','Ok',{duration:3000}).onAction().subscribe(()=>{this.route.navigate(['/admin/viewQuestions/'+ this.qId +'/'+ this.title])})

    },(error)=>{
      console.log(error)
      this.snack.open('Oops!!!!....Some error occured in adding new question','',{duration:4000})
    })

  }

}
