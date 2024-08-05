import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import  { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  public readonly signUpForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  public constructor(private readonly formBuilder: FormBuilder, private readonly authService: AuthService) { }

  public onSubmit(): void {
    this.signUpForm.markAllAsTouched();
    console.log("🍟🍔🍕  sign-up.component.ts[ln:26] on submit");
    if (this.signUpForm.valid) {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      this.authService.signUp(this.signUpForm.value.name!, this.signUpForm.value.email!, this.signUpForm.value.password!)
        .subscribe({
          // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
          next: (result: string) => console.log(`🍟🍔🍕 sign-up.component.ts[ln:25] next signup`, result),
          // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
          error: (e) => console.error(`%🍟🍔🍕 sign-up.component.ts[ln:26] error sign up `, e)
        });
    }
  }
}
