import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-search-function',
  templateUrl: './search-function.component.html',
  styleUrls: ['./search-function.component.css']
})
export class SearchFunctionComponent implements OnInit {

   
  @ViewChild(MatPaginator, { static: true })
  paginator! : MatPaginator;  
 // quizName:string=''
  displayedColumns: string[] = ['title', 'about', 'max_marks','no_of_questions','category.title','active','actions'];
//  dataSource = new MatTableDataSource(this.Quiz_DATA);
  dataSource = new MatTableDataSource();
  size=0;
  constructor(private _qs:QuizService, private _snack:MatSnackBar, private _route:Router) { }

  ngOnInit(): void {
    this._qs.getAllQuiz().subscribe((response:any)=>{
      this.size = response.length
      //console.log(response)
      //this.quiz=response
      this.dataSource = new MatTableDataSource(response)
      this.dataSource.paginator=this.paginator
      //this.dataSource.data = new MatTableDataSource(this.quiz)
      //console.log(this.dataSource)
    },(error)=>{
      console.log(error)
      this._snack.open('Cannot load data...Try again later!!!!','OK',{duration:3000})
    })
  }
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
play(qid:any){
  console.log(qid)
  this._route.navigate(['user/instructions/',qid]);
  }
}
