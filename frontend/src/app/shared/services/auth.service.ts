import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { GenericResponse } from '../../core/interfaces/generic.response';
import { UserDTO } from '../interfaces/user.dto.interface';
import { LoginRequest } from '../interfaces/login.request.interface';
import { RegisterRequest } from '../interfaces/register.request.interface';

@Service()
export class Auth {
  private http= inject(HttpClient)
  private branch = `${environment.back_url}/auth`

  getProfile(): Observable<GenericResponse<UserDTO>>{
    return this.http.get<GenericResponse<UserDTO>>(`${this.branch}/auth/profile`)
  }

  login(request: LoginRequest): Observable<GenericResponse<string>>{
    return this.http.post<GenericResponse<string>>(`${this.branch}/auth/login`, request)
  }

  registerUser(request: RegisterRequest): Observable<GenericResponse<UserDTO>>{
    return this.http.post<GenericResponse<UserDTO>>(`${this.branch}/auth/register`, request)
  }
}
