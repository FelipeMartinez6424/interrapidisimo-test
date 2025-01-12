import { Routes } from '@angular/router';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { CoursesComponent } from './components/courses/courses.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { LoginComponent } from './components/login/login.component';
import { MyCoursesComponent } from './components/mycourses/mycourses.component';
export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'dashboard',
    pathMatch: 'full'
   },
  {
    path: '', 
    component: DashboardComponent,
    title: 'Dashboard',
    children:[
      { path: 'register', component: RegisterFormComponent, title: 'Register' },
      { path: 'courses', component: CoursesComponent, title: 'courses' },
      { path: 'student-list', component: StudentListComponent, title: 'Student list' },
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'my-courses', component: MyCoursesComponent, title: 'My courses' },

      { path: '**', redirectTo: 'register' },
    ]
   }
];
