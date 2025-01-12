import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword: boolean = true;

  constructor(private fb: FormBuilder, private router: Router, private _auth: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value; // Captura el usuario y contraseña
      this._auth.login(credentials).subscribe({
        next: (response) => {
          if (response && response.cedula) {
            // Guarda la cédula en el localStorage
            localStorage.setItem('userId', response.cedula);
  
            // Navega a la página de inicio
            this.router.navigate(['/student-list']);
          } else {
            alert('Error: No se pudo obtener la cédula del usuario.');
          }
        },
        error: (err) => {
          console.error('Error al iniciar sesión:', err);
          alert('Credenciales incorrectas.');
        },
      });
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }
  

  onRegister(): void {
   
    this.router.navigate(['/register']);
  }
}

