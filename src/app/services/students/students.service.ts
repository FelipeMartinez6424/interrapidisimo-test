import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(
    private http: HttpClient, 
    private router: Router) { }

  registerStudents(students: any): Observable<any> {
    return this.http.post('https://localhost:7043/api/Studenst', students).pipe(
      catchError((error: any) => {
        console.log("error")
        return throwError(() => new Error('Error en el post del estudiante'));
      })
    );
  }
  
  getStudents(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7043/api/Studenst');
  }
  
}
