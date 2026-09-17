import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { HomeComponent } from './shared/components/home.component/home.component';
import { AboutUsComponent } from './shared/components/about.us.component/about.us.component';
import { ContactComponent } from './shared/components/contact.component/contact.component';
import { ShellComponent } from './shared/components/shell.component/shell.component';

export const routes: Routes = [
  {
    path:'', component: ShellComponent, children: [
      {path: 'about', component: AboutUsComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'home', component: HomeComponent},
      {
        path: 'group-products',
        loadChildren: () => import('./shared/components/group.products/group.customer.routes')
      },
      {
        path: 'product',
        loadChildren: () => import('./shared/components/specific.product/specific.product.routes')
      },
      {
        path: 'seller',
        canActivate: [authGuard, roleGuard],
        data: { roles: ['SELLER'] },
        loadChildren: () => import('./features/seller/seller.routes')
      },
      {
        path: '', 
        redirectTo: 'home', 
        pathMatch: 'full'
      },
    ]
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
