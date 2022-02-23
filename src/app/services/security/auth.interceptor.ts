import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "../login.service";

const TOKEN_HEADER = 'Authorization';
@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private loginServ : LoginService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): //the intercept method is having output of Observable
        Observable<HttpEvent<any>> {
       // throw new Error("Method not implemented.");
       // fetch the JWT token from localstorage add provide to Authorization HEADER to access secure APIs
       let authReq = req;
            const token = this.loginServ.getTokenFromLS();
            console.log("Inside Interceptor class...")
            if(token != null){
                authReq = authReq.clone({setHeaders:{Authorization : `Bearer ${token}`}});
            }
            return next.handle(authReq);
    }

}
export const autheInterceptorProvider =[
    {
        provide : HTTP_INTERCEPTORS, useClass : AuthInterceptor, multi : true,
    }
];