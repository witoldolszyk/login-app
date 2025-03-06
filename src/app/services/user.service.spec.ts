import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../models/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user data successfully', fakeAsync(() => {
    const expectedUser: User = { id: 1, name: 'John', surname: 'Doe', role: 'admin' };
    let actualUser: User | undefined;
    service.getUserData().subscribe(user => {
      actualUser = user;
    });
    const req = httpTestingController.expectOne('/assets/user.json');
    expect(req.request.method).toEqual('GET');
    req.flush(expectedUser);
    tick(500);
    expect(actualUser).toEqual(expectedUser);
  }));

  it('should handle error when server returns an error', fakeAsync(() => {
    let errorResponse: any;
    service.getUserData().subscribe({
      next: () => {},
      error: (error) => {
        errorResponse = error;
      }
    });
    const req = httpTestingController.expectOne('/assets/user.json');
    req.flush({ message: 'Internal Server Error' }, { status: 500, statusText: 'Server Error' });
    tick(500);
    expect(errorResponse).toBeTruthy();
    expect(errorResponse.message).toContain('Server error: 500');
  }));
});
