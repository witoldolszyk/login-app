import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockUserService: any;
  let mockAuthService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockUserService = {
      getUserData: jasmine.createSpy('getUserData').and.returnValue(of({ id: 1, name: 'Test User' }))
    };
    mockAuthService = {
      logout: jasmine.createSpy('logout').and.returnValue(of(undefined))
    };
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, HomeComponent],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should set errorMessage on getUserData error', fakeAsync(() => {
    mockUserService.getUserData.and.returnValue(throwError(() => new Error('Test error')));
    fixture.detectChanges();
    component.userData$.subscribe({ next: () => { }, error: () => { } });
    tick();
    expect(component.errorMessage).toBe('Test error');
  }));

  it('should navigate to /login on logout success', () => {
    fixture.detectChanges();
    component.logout();
    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should alert on logout error', () => {
    spyOn(window, 'alert');
    mockAuthService.logout.and.returnValue(throwError(() => new Error('Logout error')));
    fixture.detectChanges();
    component.logout();
    expect(window.alert).toHaveBeenCalledWith('Logout failed. Please try again later.');
  });
});
