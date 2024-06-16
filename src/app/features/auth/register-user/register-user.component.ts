import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})
export class RegisterUserComponent {
  public readonly authForm = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });


  public constructor(private readonly formBuilder: FormBuilder, private readonly authService: AuthService) { }

  public onSubmit(): void {
    this.authForm.markAllAsTouched();
    console.log(`🍟🍔🍕  register-user.component.ts[ln:26] on submit`);
    if (this.authForm.valid) {
      this.authService.signUp(this.authForm.value.username!, this.authForm.value.email!, this.authForm.value.password!)
        .subscribe({
          next: (result: string) => console.log(`🍟🍔🍕 auth.component.ts[ln:25] next signup`, result),
          error: (e) => console.error(`%c🍟🍔🍕 auth.component.ts[ln:26] error sign up `, e)
        });
    }
  }
}
