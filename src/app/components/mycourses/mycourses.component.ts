import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses/courses.service';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  templateUrl: './mycourses.component.html',
  styleUrls: ['./mycourses.component.scss'],
  imports: [CommonModule, MatExpansionModule],
})
export class MyCoursesComponent implements OnInit {
  courseStudent: { estudianteNombre: string; estudianteApellido: string }[] = [];
  usersByCourses: { [materiaId: number]: any[] } = {}; 
  userCourses: any[] = []; 

  constructor(private _courses: CoursesService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this._courses.getCoursesByUser(userId).subscribe({
        next: (courses: any) => {
          this.userCourses = courses.$values || courses;
        },
        error: (err) => {
          console.error('Error al cargar las materias del usuario:', err);
        },
      });
    } else {
      console.error('Cédula no encontrada. El usuario debe iniciar sesión.');
    }
  }

  getStudents(materiaId: number): void {
    this._courses.getUsersByCourses(materiaId).subscribe({
      next: (response:any) => {
        console.log('Estudiantes recibidos:', response); // Para depuración
        this.courseStudent = response.$values; // Accede a $values directamente
      },
      error: (err) => {
        console.error('Error al obtener estudiantes de la materia:', err);
      },
    });
  }
}
