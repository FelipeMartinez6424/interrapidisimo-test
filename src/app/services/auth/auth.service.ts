import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient, 
    private router: Router) {
      const userLoggedIn = !!localStorage.getItem('userId');
      this.isLoggedSubject.next(userLoggedIn);
    }

  isLogged$ = this.isLoggedSubject.asObservable();

  login(user: any): Observable<any> {
    return this.http.post('https://localhost:7043/api/Auth/Login', user).pipe(
      catchError((error: any) => {
        console.error("Error en el login", error);
        return throwError(() => new Error('Error en el login'));
      })
    );
  }

  isLogged(): boolean {
    return this.isLoggedSubject.value;
  }

  logout(): void {
    localStorage.removeItem("userId");
    this.isLoggedSubject.next(false);
    this.router.navigate(['/login']);
  }

  setLoggedUser(userId: string): void {
    localStorage.setItem("userId", userId);
    this.isLoggedSubject.next(true);
  }
}
