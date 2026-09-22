import { Routes } from '@angular/router';
import { ShellComponent } from './shared/components/shell.component/shell.component';

export const routes: Routes = [
  {
    path:'', 
    component: ShellComponent, 
    loadChildren: () => import('./shared/components/shell.component/shell.routes')
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes')
  },
  {
    path: '**', 
    redirectTo: 'auth/login'
  }
];
