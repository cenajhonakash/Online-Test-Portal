import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource} from '@angular/material/table';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  @ViewChild(MatPaginator, { static: true })
  paginator! : MatPaginator;  

  size:any=0;
  displayedColumns: string[] = ['title','category.title', 'about', 'max_marks','no_of_questions','active','actions'];
  dataSource = new MatTableDataSource();
  
  constructor(private _qs:QuizService, private _snack:MatSnackBar) { }

  ngOnInit(): void {
    this._qs.getAllQuiz().subscribe((response:any)=>{
      
      this.size=response.length
      this.dataSource = new MatTableDataSource(response)
      this.dataSource.paginator=this.paginator
      
    },(error:any)=>{
      console.log(error)
      this._snack.open('Cannot load data...Try again later!!!!','OK',{duration:3000})
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
