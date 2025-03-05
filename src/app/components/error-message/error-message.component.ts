import { Component, ChangeDetectionStrategy, input, ChangeDetectorRef, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: 'error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ErrorMessageComponent implements OnInit, OnDestroy {
  readonly validationResult = input<FormControl>();

  private sub!: Subscription;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    const control = this.validationResult();
    if (control) {
      this.sub = control.valueChanges.subscribe(() => {
        this.cd.markForCheck();
      });
    }
  }
  shouldShowError(): boolean {
    const control = this.validationResult();
    if (!control) {
      return false;
    }
    return control.invalid && (control.touched || control.dirty);
  }

  getErrorMessage(): string {
    const control = this.validationResult();
    if (control?.errors?.['required']) {
      return 'This field is required';
    }
    if (control?.errors?.['invalidEmail']) {
      return 'Email is not correct';
    }
    return '';
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
