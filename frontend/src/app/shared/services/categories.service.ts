import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { GenericResponse } from '../../core/interfaces/generic.response';
import { CreateCategoryRequest } from '../interfaces/categories/create.category.request.interface';
import { CategoryDTO } from '../interfaces/categories/category.dto.interface';
import { Observable } from 'rxjs';
import { ramas_disp } from '../ramas';
import { UpdateCategoryRequest } from '../interfaces/categories/update.category.request.interface';

@Service()
export class CategoriesService {
  private http= inject(HttpClient)
  private url= `${environment.back_url}`
  private rama: ramas_disp= '/categories/'
  createCategory(request: CreateCategoryRequest, ): Observable<GenericResponse<CategoryDTO>>{ 
    return this.http.post<GenericResponse<CategoryDTO>>(`${this.url}${this.rama}`, request)
  }

  getCategories(): Observable<GenericResponse<CategoryDTO[]>>{
    return this.http.get<GenericResponse<CategoryDTO[]>>(`${this.url}${this.rama}`)
  } 

  getCategoryById(): Observable<GenericResponse<CategoryDTO>>{
    return this.http.get<GenericResponse<CategoryDTO>>(`${this.url}${this.rama}1`)
  }

  updateCategory(request: UpdateCategoryRequest, id: number): Observable<GenericResponse<CategoryDTO>>{
    return this.http.put<GenericResponse<CategoryDTO>>(`${this.url}${this.rama}${id}`, request)
  }

  softDeleteCategory(id: number): Observable<GenericResponse<null>>{
    return this.http.delete<GenericResponse<null>>(`${this.url}${this.rama}${id}`)
  }
}