import { Category } from "../../domain/entities/category";

export interface ICategoryRepository{
  createCategory({entity}:{entity: Category | Omit<Category, "created_at" | "deleted_at" | "product">}): Promise<Category>
  ifExistsCategoryByName({name}:{name: string}): Promise<Boolean>
  getAllCategories(): Promise<Category[]>
  getCategoryById({id}:{id: number}): Promise<Category | null>
  modCategoryById({entity}:{entity: Category}): Promise<Category>
  deleteCategory({id}:{id: number}): Promise<Boolean>
}