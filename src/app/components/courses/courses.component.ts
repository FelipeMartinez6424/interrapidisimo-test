import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses/courses.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-courses',
  standalone: true,
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatChipsModule
  ],
})
export class CoursesComponent implements OnInit {
  subjects: { id: number; nombre: string; profesorId: number }[] = [];
  selectedSubjects: { id: number; nombre: string; profesorId: number }[] = [];

  constructor(private _courses: CoursesService) {}

  ngOnInit(): void {
    this.loadMaterias();
  }

  // Cargar materias desde el backend
  loadMaterias(): void {
    this._courses.getCourses().subscribe({
      next: (data: any) => {
        this.subjects = data.$values;
        console.log("subjects ->",data.$values)
      },
      error: (err) => {
        console.error('Error al cargar las materias:', err);
      },
    });
  }

  toggleSelection(subject: { id: number; nombre: string; profesorId: number }): void {
    console.log("subject -> ", subject)
    const index = this.selectedSubjects.findIndex((s) => s.id === subject.id);

    if (index >= 0) {
      this.selectedSubjects.splice(index, 1);
    } else if (this.selectedSubjects.length < 3) {
      this.selectedSubjects.push(subject);
    }
  }

  isSelected(subject: { id: number; nombre: string; profesorId: number }): boolean {
    return this.selectedSubjects.some((s) => s.id === subject.id);
  }

  isDisabled(subject: { id: number; nombre: string; profesorId: number }): boolean {
    return (
      this.selectedSubjects.length >= 3 ||
      this.selectedSubjects.some((s) => s.profesorId === subject.profesorId && subject.id != s.id)
    );
  }

  onSubmit(): void {
    const userCedula = localStorage.getItem('userId');
    if (!userCedula) {
      alert('Error: No se encontró la cédula del usuario. Por favor, inicia sesión.');
      return;
    }
  
    const payload = {
      cedula: userCedula, 
      materias: this.selectedSubjects.map((s) => s.id), 
    };
  
    this._courses.registerCourses(payload).subscribe({
      next: () => {
        alert('Materias registradas exitosamente.');
      },
      error: (err) => {
        console.error('Error al registrar materias:', err);
        alert('Ocurrió un error al registrar las materias.');
      },
    });
  }
  
}
