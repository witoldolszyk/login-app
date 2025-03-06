import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Credentials } from '../models/credentials.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login(credentials: Credentials): Observable<string> {
    const token = Math.random().toString(36).substring(2);
    return of(token).pipe(
      tap(token => {
        localStorage.setItem('token', token);
        // I use fake data storage in localStorage temporarily because there's no backend implemented yet.
        localStorage.setItem('userCredentials', JSON.stringify(credentials));
      }),
      catchError(this.handleError)
    );
  }

  logout(): Observable<void> {
    return of(undefined).pipe(
      tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('userCredentials');
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: unknown) {
    console.error('AuthService error:', error);
    return throwError(() => new Error('Operation failed.'));
  }
}
