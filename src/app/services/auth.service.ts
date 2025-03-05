import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
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
        localStorage.setItem('userCredentials', JSON.stringify(credentials));
      })
    );
  }

  logout(): Observable<void> {
    return of(undefined).pipe(
      tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('userCredentials');
      })
    );
  }
}
