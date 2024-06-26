import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./features/auth/auth.routes').then((m) => m.routes) },
  { path: '', redirectTo: 'auth', pathMatch: 'full' }
];
