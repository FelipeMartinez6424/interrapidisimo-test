import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { StudentsService } from '../../services/students/students.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-student-list',
  standalone: true,
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class StudentListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nombre',
    'apellido',
    'tipoDocumento',
    'numeroDocumento',
    'correo',
    'telefono',
    'direccion',
    'fechaNacimiento',
  ];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _student: StudentsService) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
    this._student.getStudents().subscribe({
      next: (data: any) => {
        console.log("data ->", data)
        console.log(data)
        this.dataSource.data = data.$values;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Error al obtener estudiantes:', err);
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}