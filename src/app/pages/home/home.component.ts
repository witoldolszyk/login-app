import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  userData$!: Observable<User>;

  constructor(private userService: UserService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.userData$ = this.userService.getUserData();
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });  
  }
}
