import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
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
    return new Observable<void>(observer => {
      localStorage.removeItem('token');
      localStorage.removeItem('userCredentials');
      observer.next();
      observer.complete();
    });
  }
}
