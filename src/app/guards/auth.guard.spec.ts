import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { runInInjectionContext, EnvironmentInjector } from '@angular/core';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
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

  it('should allow activation when token exists', () => {
    localStorage.setItem('token', 'dummy-token');
    const dummyRoute = {} as ActivatedRouteSnapshot;
    const dummyState = {} as RouterStateSnapshot;
    const result = runInInjectionContext(injector, () => AuthGuard(dummyRoute, dummyState));
    expect(result).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to /login and return false when token does not exist', () => {
    const dummyRoute = {} as ActivatedRouteSnapshot;
    const dummyState = {} as RouterStateSnapshot;
    const result = runInInjectionContext(injector, () => AuthGuard(dummyRoute, dummyState));
    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
