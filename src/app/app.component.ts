import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { CoursesComponent } from "./components/courses/courses.component";
import { LoginComponent } from './components/login/login.component';


@Component({
  selector: 'app-root',
  imports: [HeaderComponent, LoginComponent, RouterOutlet, CoursesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Interrapidisimo Test';
}
