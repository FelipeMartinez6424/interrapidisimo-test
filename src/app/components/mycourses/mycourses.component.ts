import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { CoursesService } from '../../services/courses/courses.service';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  templateUrl: './mycourses.component.html',
  styleUrls: ['./mycourses.component.scss'],
  imports: [CommonModule, MatExpansionModule, HttpClientModule],
})

export class MyCoursesComponent implements OnInit {
  usersByCourses: { [courseId: number]: any[] } = {}; // Usuarios por materia
  userCourses: any;
  courseStudent: any;

  constructor(private _courses: CoursesService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this._courses.getCoursesByUser(userId).subscribe({
        next: (courses:any) => {
          this.userCourses = courses.$values;
        },
        error: (err) => {
          console.error('Error al cargar las materias del usuario:', err);
        },
      });
    } else {
      console.error('Cédula no encontrada. El usuario debe iniciar sesión.');
    }
  }

  getStudents(userId: any) {
    this._courses.getUsersByCourses(userId).subscribe({
      next: (student: any) => {
        this.courseStudent = student.$values;
      },
      error: (err) => {
        console.error('Error al cargar las materias del usuario:', err);
      },
    });
  }
}
