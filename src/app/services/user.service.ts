import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, Observable, throwError } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getUserData(): Observable<User> {
    return this.http.get<User>('/assets/user.json')
      .pipe(
        delay(500),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Network error: ${error.error.message}`;
    } else {
      errorMessage = `Server error: ${error.status}, message: ${error.message}`;
    }
    
    console.error('Error occurred:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
