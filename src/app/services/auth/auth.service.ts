import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient, 
    private router: Router) { }

  login(user: any): Observable<any> {
    return this.http.post('https://localhost:7043/api/Auth/Login', user).pipe(
      catchError((error: any) => {
        console.log("error")
        return throwError(() => new Error('Error en el login'));
      })
    );
  }
  
}
