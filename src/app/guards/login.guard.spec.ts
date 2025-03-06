import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { runInInjectionContext, EnvironmentInjector } from '@angular/core';
import { LoginGuard } from './login.guard';

describe('LoginGuard', () => {
  let routerSpy: jasmine.SpyObj<Router>;
  let injector: EnvironmentInjector;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: routerSpy }]
    });
    injector = TestBed.inject(EnvironmentInjector);
    localStorage.clear();
  });

  it('should allow activation when no token exists', () => {
    const dummyRoute = {} as ActivatedRouteSnapshot;
    const dummyState = {} as RouterStateSnapshot;
    const result = runInInjectionContext(injector, () => LoginGuard(dummyRoute, dummyState));
    expect(result).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to /home and return false when token exists', () => {
    localStorage.setItem('token', 'dummy-token');
    const dummyRoute = {} as ActivatedRouteSnapshot;
    const dummyState = {} as RouterStateSnapshot;
    const result = runInInjectionContext(injector, () => LoginGuard(dummyRoute, dummyState));
    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });
});
