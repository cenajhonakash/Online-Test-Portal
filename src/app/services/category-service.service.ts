import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor(private _http:HttpClient) { }
  //load all categories
  public categories(){
    return this._http.get(`${baseUrl}/category/`)
  }
  //add new category
  public add(categories:any){
    return this._http.post(`${baseUrl}/category/`,categories);
  }

  //get Quiz of a Category
  public getQuizzesOfcategory(cid:any){
    return this._http.get(`${baseUrl}/category/fetch-quiz/${cid}`)
  }
}
