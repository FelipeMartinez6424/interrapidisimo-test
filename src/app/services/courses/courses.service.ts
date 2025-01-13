import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  apiUrl = 'https://localhost:7043/api/Materias';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
  hasRegisteredCourses(userCedula: string): Observable<boolean> {
    return this.http.get<boolean>(`https://localhost:7043/api/Materias/HasRegisteredCourses/${userCedula}`).pipe(
      
    );
  }
  registerCourses(payload: { cedula: string; materias: number[] }): Observable<any> {
    return this.http.post(`${this.apiUrl}/RegisterCourses`, payload);
  }

  getCoursesByUser(cedula: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/CoursesofStudents/${cedula}`);
  }

  getUsersByCourses(materiaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/StudentforCourses/${materiaId}`);
  }

}
