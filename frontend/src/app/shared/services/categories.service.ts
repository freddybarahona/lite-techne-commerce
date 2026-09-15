import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { GenericResponse } from '../../core/interfaces/generic.response';
import { CreateCategoryRequest } from '../interfaces/create.category.request.interface';
import { CategoryDTO } from '../interfaces/category.dto.interface';
import { Observable } from 'rxjs';
import { ramas_disp } from '../../ramas';

@Service()
export class CategoriesService {
  private http= inject(HttpClient)
  private url= `${environment.back_url}`
  private rama: ramas_disp= '/categories/'
  createCategory(request: CreateCategoryRequest, ): Observable<GenericResponse<CategoryDTO>>{ 
    return this.http.post<GenericResponse<CategoryDTO>>(`${this.url}${this.rama}`, request)
  }

  getCategories(): Observable<GenericResponse<CategoryDTO>>{
    return this.http.get<GenericResponse<CategoryDTO>>(`${this.url}${this.rama}`)
  } 

  getCategoryById(): Observable<GenericResponse<CategoryDTO>>{
    return this.http.get<GenericResponse<CategoryDTO>>(`${this.url}${this.rama}/1`)
  }
}