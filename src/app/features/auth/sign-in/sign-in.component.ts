import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  public readonly signInForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  public constructor(private readonly formBuilder: FormBuilder, private readonly authService: AuthService) { }

  public onSubmit(): void {
    this.signInForm.markAllAsTouched();
    console.log(`🍟🍔🍕  sign-in.component.ts[ln:26] on submit`);
    if (this.signInForm.valid) {
      // this.authService.signUp(this.signInForm.value.username!, this.signInForm.value.email!, this.signInForm.value.password!)
      //   .subscribe({
      //     next: (result: string) => console.log(`🍟🍔🍕 auth.component.ts[ln:25] next signup`, result),
      //     error: (e) => console.error(`%c🍟🍔🍕 auth.component.ts[ln:26] error sign up `, e)
      //   });
    }
  }
}
