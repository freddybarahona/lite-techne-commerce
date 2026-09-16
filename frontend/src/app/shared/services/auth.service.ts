import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment'; 
//los imports de environment que sean a produccion porque angular lo resolvera por su cuenta si no funciona
import { Observable } from 'rxjs';
import { GenericResponse } from '../../core/interfaces/generic.response';
import { UserDTO } from '../interfaces/auth/user.dto.interface';
import { LoginRequest } from '../interfaces/auth/login.request.interface';
import { RegisterRequest } from '../interfaces/auth/register.request.interface';
import { ramas_disp } from '../../ramas';

@Service()
export class Auth {
  private http= inject(HttpClient)
  private url = `${environment.back_url}`
  private rama : ramas_disp= "/auth/"

  getProfile(): Observable<GenericResponse<UserDTO>>{
    return this.http.get<GenericResponse<UserDTO>>(`${this.url}${this.rama}profile`)
  }

  login(request: LoginRequest): Observable<GenericResponse<string>>{
    return this.http.post<GenericResponse<string>>(`${this.url}${this.rama}login`, request)
  }

  registerUser(request: RegisterRequest): Observable<GenericResponse<UserDTO>>{
    return this.http.post<GenericResponse<UserDTO>>(`${this.url}${this.rama}register`, request)
  }
}
