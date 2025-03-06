import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Credentials } from '../models/credentials.model';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and store token and credentials in localStorage', (done) => {
    const credentials: Credentials = { email: 'test@test.com', password: '123456' };
    
    spyOn(localStorage, 'setItem').and.callThrough();

    service.login(credentials).subscribe((token: string) => {
      expect(token).toBeTruthy();
      expect(localStorage.setItem).toHaveBeenCalledWith('token', token);
      expect(localStorage.setItem).toHaveBeenCalledWith('userCredentials', JSON.stringify(credentials));
      done();
    });
  });

  it('should logout and remove token and credentials from localStorage', (done) => {
    localStorage.setItem('token', 'dummy-token');
    localStorage.setItem('userCredentials', JSON.stringify({ email: 'test@test.com', password: '123456' }));

    spyOn(localStorage, 'removeItem').and.callThrough();

    service.logout().subscribe(() => {
      expect(localStorage.removeItem).toHaveBeenCalledWith('token');
      expect(localStorage.removeItem).toHaveBeenCalledWith('userCredentials');
      done();
    });
  });
});
