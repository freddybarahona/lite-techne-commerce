import { DeleteResult } from "typeorm";
import { Category } from "../entities/category";

export interface ICategoryRepository{
  createCategory(data: Category): Promise<Category>
  ifExistsCategoryByName(data: string): Promise<Boolean>
  getAllCategories(): Promise<Category[]>
  getCategoryById(data: number): Promise<Category | null>
  modCategoryById(data: Category): Promise<Category>
  deleteCategory(data: number): Promise<Boolean>
}