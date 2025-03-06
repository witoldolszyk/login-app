import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ErrorMessageComponent } from './error-message.component';
import { FormControl } from '@angular/forms';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;
  let control: FormControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorMessageComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    control = new FormControl('');
    (component as any).validationResult = () => control;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show error when control is valid', () => {
    control.setErrors(null);
    control.markAsUntouched();
    control.markAsPristine();
    expect(component.shouldShowError()).toBeFalse();
  });

  it('should show error when control is invalid and touched', () => {
    control.setErrors({ required: true });
    control.markAsTouched();
    expect(component.shouldShowError()).toBeTrue();
  });

  it('should return "This field is required" for required error', () => {
    control.setErrors({ required: true });
    expect(component.getErrorMessage()).toBe('This field is required');
  });

  it('should return "Email is not correct" for invalidEmail error', () => {
    control.setErrors({ invalidEmail: true });
    expect(component.getErrorMessage()).toBe('Email is not correct');
  });

  it('should update view on control value change', fakeAsync(() => {
    spyOn((component as any).cd, 'markForCheck');
    control.setValue('new value');
    tick();
    expect((component as any).cd.markForCheck).toHaveBeenCalled();
  }));

  it('should unsubscribe on destroy', () => {
    spyOn((component as any).sub, 'unsubscribe');
    component.ngOnDestroy();
    expect((component as any).sub.unsubscribe).toHaveBeenCalled();
  });
});
