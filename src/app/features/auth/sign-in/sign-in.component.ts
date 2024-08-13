import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserCredential } from '@angular/fire/auth';

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
    if (this.signInForm.valid) {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      this.authService.signIn(this.signInForm.value.email!, this.signInForm.value.password!)
        .subscribe({
          next: (userCredential: UserCredential) => console.log(`🍟🍔🍕 sgn-in.component.ts[ln:25] next sign in`, userCredential),
          error: (e) => console.error(`%c🍟🍔🍕 auth.component.ts[ln:26] error sign up `, e)
        });
    }
  }
}
