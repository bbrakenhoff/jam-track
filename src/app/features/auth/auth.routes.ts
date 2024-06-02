import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from './register-user/register-user.component';

export const routes: Routes = [
  { path: 'register', component: RegisterUserComponent },
  { path: '', redirectTo: 'register', pathMatch: 'full' }
];
