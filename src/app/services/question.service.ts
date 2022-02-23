import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

  public getQuestionsOf_quiz(qid:any){
    return this._http.get(`${baseUrl}/question/quiz/admin-all/${qid}`)
  }

  public getQuestionsOf_quizForCandidate(qid:any){
    return this._http.get(`${baseUrl}/question/quiz/${qid}`)
  }
  public addNewQuestion(question:any){
    return this._http.post(`${baseUrl}/question/`,question);
  }
  public deleteQuestion(quesId:any){
    return this._http.delete(`${baseUrl}/question/${quesId}`);
  }

  public getQuestionFromQuesId(quesId:any){
    return this._http.get(`${baseUrl}/question/${quesId}`)
  }

  public updateQuestion(question:any){
    return this._http.put(`${baseUrl}/question/`,question)
  }

}
