import { Category } from "../../domain/entities/category"
import { SeedConstants } from "../../shared/constants/SeedConstants"
import { CategoryRepository } from "../config/database/CategoryRepository"
import { AppdDataSource } from "../config/database/dataSource"
import { env } from "../env/env"

export const seedCategories = async() =>{
  const categorySource= AppdDataSource.getRepository(Category)
  const categoryRepo= new CategoryRepository(categorySource)
  const categories: Omit<Category, "created_at" | "deleted_at" | "product">[]=[
    {category_id: env.category_1_id, name: env.category_1_name, description: env.category_1_description},
    {category_id: env.category_2_id, name: env.category_2_name, description: env.category_2_description},
    {category_id: env.category_3_id, name: env.category_3_name, description: env.category_3_description},
    {category_id: env.category_4_id, name: env.category_4_name, description: env.category_4_description}
  ]

  for(let i=0; i< categories.length; i++){
    let actualCategory= await categoryRepo.ifExistsCategoryByName(categories[i].name)
    if(!actualCategory){
      console.log(SeedConstants.categoryNotExist(categories[i].name))
      await categoryRepo.createCategory(categories[i])
      console.log(SeedConstants.categoryCreated(categories[i].name, categories[i].category_id))
    }
  }
}