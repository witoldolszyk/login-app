import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { emailValidator } from '../../validators/email.validator';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent { 
  constructor(private fb: FormBuilder) {}

  loginForm: FormGroup = this.fb.group({
    email: new FormControl('', [Validators.required, emailValidator()]),
    password: new FormControl('', Validators.required)
  });

  get emailControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordError(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Log in:', this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
