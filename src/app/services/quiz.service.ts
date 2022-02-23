import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http:HttpClient) {}

  //load all quiz
  public getAllQuiz(){
    return this._http.get(`${baseUrl}/quiz/`)
  }
  //add new quiz
  public addQuiz(quiz:any){
    return this._http.post(`${baseUrl}/quiz/`,quiz);
  }

  //delete Quiz
  public deleteQuiz(qid:any){
   return this._http.delete(`${baseUrl}/quiz/${qid}`);
  }

  //get single Quiz
  public getAQuiz(qid:any){
    return this._http.get(`${baseUrl}/quiz/${qid}`);
   }

   //update the quiz
   public updateQuiz(quiz:any){
    return this._http.put(`${baseUrl}/quiz/`,quiz);
   }
}
