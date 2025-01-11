import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http: HttpClient, 
    private router: Router) { }

  registerStudents(students: any): Observable<any> {
    return this.http.post('https://localhost:7043/api/Estudiantes', students).pipe(
      catchError((error: any) => {
        console.log("error")
        return throwError(() => new Error('Error en el post del estudiante'));
      })
    );
  }
}
