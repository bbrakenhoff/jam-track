import { Routes } from '@angular/router';
import { SignUpComponent as SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';

export const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' }
];
