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
  hasRegisteredCourses(cedula: string): Observable<boolean> {
    return this.http.get<boolean>(`https://localhost:7043/api/Materias/HasRegisteredCourses/${cedula}`);
  }

  registerCourses(payload: { cedula: string; materias: number[] }): Observable<any> {
    return this.http.post(`${this.apiUrl}/RegistrarMaterias`, payload);
  }

  getCoursesByUser(cedula: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/MateriasdelUsuario/${cedula}`);
  }

  getUsersByCourses(materiaId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/UsuariosPorMateria/${materiaId}`);
  }

}
