import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthSessionService } from '../../../core/auth/auth-session.service';


@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './site-header.html',
})
export class SiteHeader {
  private readonly router = inject(Router)
  private readonly session = inject(AuthSessionService)
  
  
  isLogged = () => this.session.isAuthenticated()

  logout(){
    this.session.deleteToken()
    this.router.navigate(['/home'])
  }

  get role(){
    return this.session.getRole()
  }

  get dashboard(){ //getter con binding una forma mejor de obtener y crear propiedad
    return this.session.getDashboard()
  }

  get cart(){
    const subrute= this.dashboard + '/cart'
    return subrute
  }

  get subrute(){
    switch(this.dashboard){
      case '/administrator':
        return this.dashboard + '/report-items'
      case '/seller':
        return this.dashboard + '/cart'
      default:
        return null
    }
  }
}
