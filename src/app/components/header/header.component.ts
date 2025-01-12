import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, RouterModule, CommonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit {
  isLogged: boolean = false;
  constructor(private _auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this._auth.isLogged$.subscribe((loggedStatus) => {
      this.isLogged = loggedStatus;
    });
  }

  logout() {
    this._auth.logout();
    this.router.navigate(['/login']);
    alert("Sesión cerrada");
  }
}
