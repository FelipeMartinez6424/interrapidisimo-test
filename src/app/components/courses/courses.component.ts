import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  standalone: true,
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  imports: [
    MatChipsModule, // Módulo para Chips
    MatButtonModule, // Módulo para Botones
    CommonModule,
  ],
})
export class CoursesComponent {
  subjects: string[] = [
    'Cálculo diferencial',
    'Álgebra lineal',
    'Inglés',
    'Introducción a la ingeniería',
    'Fundamentos de programación',
    'Física',
    'Lógica difusa',
    'Software como servicio',
    'Diseño de algoritmos',
    'Introducción a la ingeniería de sistemas',
  ];

  selectedSubjects: string[] = [];

  toggleSelection(subject: string): void {
    const index = this.selectedSubjects.indexOf(subject);

    if (index >= 0) {
      this.selectedSubjects.splice(index, 1);
    } else if (this.selectedSubjects.length < 3) {
      this.selectedSubjects.push(subject);
    }
  }

  isSelected(subject: string): boolean {
    return this.selectedSubjects.includes(subject);
  }

  onSubmit(): void {
    alert('Materias seleccionadas: ' + this.selectedSubjects.join(', '));
  }
}


