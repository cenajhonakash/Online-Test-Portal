import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { LoginService } from 'src/app/services/login.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz-of-category',
  templateUrl: './load-quiz-of-category.component.html',
  styleUrls: ['./load-quiz-of-category.component.css']
})
export class LoadQuizOfCategoryComponent implements OnInit {

  //showActiveQuiz: boolean = false;
  buttonDisabled: boolean=true;
  countToggle:any=0;
  cId=0
  title=''
  backupquiz:any=[]
  quizzes:any=[]
  userRoleADMIN:boolean=false;
  constructor(private _catS:CategoryServiceService,private _router:ActivatedRoute,
    private snack:MatSnackBar, private route:Router, private _ls:LoginService, private _quizServ:QuizService) { }

  
  ngOnInit(): void {
    if(this._ls.getCurrentUserFromLS().authorities[0].authority == 'ADMIN')
      this.userRoleADMIN = true
    if(this.countToggle==0){
      this.cId =this._router.snapshot.params['cid']
      this.title =this._router.snapshot.params['title']
      console.log('Loading quiz for set : ' +this.cId)
      
    this._catS.getQuizzesOfcategory(this.cId).subscribe((data)=>{  
      this.quizzes = data;
      this.backupquiz=data 
    },(error)=>{
      console.log('Error in loading quiz due to below : '+error)
      this.snack.open('Oops!!!.....Something went wrong in loading quizzes','Dismiss',{duration:3000})
    })
    }     
    if(this.countToggle%2 != 0){   
      this.quizzes = this.quizzes.filter((q:any)=>q.active)
      console.log("Only Active Quiz required") 
    }else{
      this.quizzes=this.backupquiz
    }
  }

  onChange() {
    this.countToggle++
    //this.showActiveQuiz=true;
   // console.log('User need Only active quiz'+this.countToggle);
    this.ngOnInit()
  } 

  deleteQuiz(qid:any){

  }
}
