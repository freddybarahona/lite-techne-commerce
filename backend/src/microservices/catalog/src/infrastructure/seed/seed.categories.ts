import { Category } from "../../domain/entities/category";
import { CategoryRepository } from "../../features/category/category.repository";
import AppDataSource from "../config/database/data.source";
import { Environment } from "../../core/config/env/env";

export class SeedCategories{
  private source= new AppDataSource().create_get_instance()

  constructor(private readonly env: Environment){}

  async start(){
    const categoryRepo= new CategoryRepository(this.source.getRepository(Category))
    const categories: Omit<Category, "created_at" | "deleted_at" | "product">[]=[
      {category_id: this.env.category_1_id, name: this.env.category_1_name, description: this.env.category_1_description},
      {category_id: this.env.category_2_id, name: this.env.category_2_name, description: this.env.category_2_description},
      {category_id: this.env.category_3_id, name: this.env.category_3_name, description: this.env.category_3_description},
      {category_id: this.env.category_4_id, name: this.env.category_4_name, description: this.env.category_4_description}
    ]

    for(let i=0; i< categories.length; i++){
      const actualCategory= await categoryRepo.ifExistsCategoryByName({name: categories[i].name})
      if(!actualCategory){
        console.log(`la categoria ${categories[i].name} no existe, se procedera a crearla`)
        await categoryRepo.createCategory({entity: categories[i]})
        console.log(`la categoria ${categories[i].name} de indice ${categories[i].category_id} se creo`)
      }
    }
  }
}