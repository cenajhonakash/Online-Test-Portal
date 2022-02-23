import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  
  @ViewChild(MatPaginator, { static: true })
  paginator! : MatPaginator;  
  
  displayedColumns: string[] = ['imageURL','firstName', 'userName','email','phone','active','actions'];
  dataSource = new MatTableDataSource();
  userid:any;
  candidates:any;
  activecandidates:any;
  constructor(private _ls:LoginService, private Us:UserService, private _snack:MatSnackBar) { }

  ngOnInit(): void {
    this.userid = this._ls.getCurrentUserFromLS().userID;
    this.Us.getAllNormalUser(this.userid).subscribe((list:any)=>{

      this.candidates = list;
      this.activecandidates = this.candidates.filter((x:any)=>x.enabled)

      this.dataSource=new MatTableDataSource(list);
      this.dataSource.paginator=this.paginator

    },(error)=>{
      this._snack.open('Error loading the candidates data....','OK',{duration:3000})
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  modifyCandidate(id:any){
    let u=this.candidates.filter((user:any)=>user.userID==id)
    //console.log(u)
      this.Us.updateCandidate(id).subscribe((data)=>{  
        //console.log(u.enabled)
        //console.log(data)
       this.ngOnInit()
      },(error)=>{ console.log(error)})
    //this.ca
  }
}
