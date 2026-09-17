import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { HomeComponent } from './shared/components/home.component/home.component';
import { AboutUsComponent } from './shared/components/about.us.component/about.us.component';
import { ContactComponent } from './shared/components/contact.component/contact.component';
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
