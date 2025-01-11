import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

import { StudentsService } from '../../services/students/students.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
})
export class RegisterFormComponent {
  registerForm: FormGroup;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  documentTypes: string[] = ['Cédula de Ciudadanía', 'Tarjeta de Identidad', 'Cédula de Extranjería'];

  constructor(private fb: FormBuilder, private _students: StudentsService) {
    this.registerForm = this.fb.group(
      {
        firstName: [
          '',
          [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')],
        ],
        lastName: [
          '',
          [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')],
        ],
        documentType: ['', Validators.required],
        documentNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(2)]],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(8),
            Validators.pattern('^(?=.*[A-Z])(?=.*\\d{2,}).{8}$'),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        address: ['', [Validators.required, Validators.minLength(2)]],
        birthDate: this.fb.group({
          startDate: ['', [Validators.required, this.validateBirthDate]],
        }),
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = {
        Nombre: this.registerForm.value.firstName,
        Apellido: this.registerForm.value.lastName,
        TipoDocumento: this.registerForm.value.documentType,
        NumeroDocumento: this.registerForm.value.documentNumber,
        Correo: this.registerForm.value.email,
        Contraseña: this.registerForm.value.password,
        Telefono: this.registerForm.value.phone,
        Direccion: this.registerForm.value.address,
        FechaNacimiento: this.registerForm.value.birthDate.startDate, // Ajustar si es necesario
      };
  
      this._students.registerStudents(formData).subscribe({
        next: (response) => {
          console.log('Usuario registrado con éxito:', response);
          alert('Registro exitoso');
        },
        error: (err) => {
          console.error('Error al registrar usuario:', err);
          alert('Hubo un error al registrar el usuario.');
        },
      });
    } else {
      console.log('Formulario no válido');
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
  

  // Validación personalizada para fecha de nacimiento
  validateBirthDate(control: AbstractControl): { [key: string]: boolean } | null {
    const inputDate = new Date(control.value);
    const today = new Date();
    if (inputDate >= today) {
      return { invalidDate: true };
    }
    return null;
  }

  // Validación personalizada para contraseñas iguales
  passwordsMatchValidator(group: AbstractControl): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      const confirmControl = group.get('confirmPassword');
      confirmControl?.setErrors({ passwordsMismatch: true });
      return { passwordsMismatch: true };
    }
    return null;
  }

  // Funciones para alternar visibilidad de contraseñas
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
}
