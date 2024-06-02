import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})
export class RegisterUserComponent {
  public readonly authForm = this.formBuilder.group({
    displayName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  private readonly heading$$ = new BehaviorSubject<string>('Register');
  public readonly heading$ = this.heading$$.asObservable();

  public constructor(private readonly formBuilder: FormBuilder) { }

  public onSubmit(): void {
    console.log(`%c🍟🍔🍕 auth.component.ts[ln:22] onSubmit()`, 'color: deeppink', this.authForm.valid, this.authForm.value);
    if (this.authForm.valid) {
      // this.authService.signUp(this.authForm.value.displayName!, this.authForm.value.email!, this.authForm.value.password!)
      //   .subscribe({
      //     next: (result: string) => console.log(`%c🍟🍔🍕 auth.component.ts[ln:25] next signup`, 'color: deeppink', result),
      //     error: (e) => console.error(`%c🍟🍔🍕 auth.component.ts[ln:26] error sign up `, e)
      //   })
    }
  }
}
