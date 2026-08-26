import { Category } from "../entities/category";

export interface ICategoryRepository{
  createCategory(data: Category): Promise<Category>
  ifExistsCategoryByName(data: string): Promise<Boolean>
  getAllCategories(): Promise<Category[]>
}