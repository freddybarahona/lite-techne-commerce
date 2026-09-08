export class SeedConstants{
  //bad
  static BASE_USER_SEARCH_FALSE="Usuario base ya existe"
  static roleNotExist(roleName: string){
    return `el rol ${roleName} no existe`
  }
  static roleCreated(roleName: string){
    return `el rol ${roleName} se creo con exito`
  }
    
  //good
  static BASE_USER_SEARCH_TRUE="Usuario base creado con exito"
  static usuarioCreado(roleName: string, userName: string){
    return `${roleName} base ${userName} se creo con exito`
  }
}