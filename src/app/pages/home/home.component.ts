import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  userData$!: Observable<User>;
  errorMessage: string | null = null;


  constructor(private userService: UserService, private router: Router, private authService: AuthService, private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.userData$ = this.userService.getUserData().pipe(
      catchError(error => {
        this.errorMessage = error.message;
        this.cd.markForCheck();
        return EMPTY;
      })
    );
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error: Error) => {
        console.error('Logout error:', error);
        alert('Logout failed. Please try again later.');
      }
    });
  }
}
