export class ResponseConstants{
  //good responses
  static entityCreatedCorrectly(params:{entity: string, creation_data: string | number}){
    return `el ${params.entity} conocido como ${params.creation_data} se creo correctamente`
  }

  static dbFull({entity, cant}:{entity: string, cant: number}){
    return `se encontraron ${cant} elementos en ${entity} data`
  }

  static somethingFoundHere(params:{element: string, ind: number, entity: string}){
    return `se encontro el elemento ${params.element} con indice ${params.ind} en ${params.entity} data`
  }

  //bad responses
  static requiredSpace(params:{campo: string}){
    return `el campo ${params.campo} es requerido`
  }
  static onlyTypes(params:{campo: string, type: string}){
    return `el campo ${params.campo} solo admite ${params.type}`
  }

  static maxLength(params:{data: string, max: number}){
    return `el campo ${params.data} tiene un maximo de ${params.max} caracteres`
  }

  static dbEmpty(params:{entity: string} ){
    return `no se encontraron elementos en ${params.entity} data`
  }

  static nothingLikeThatHere(params:{entity: string, ind: number}){
    return `no se encontro el elemento ${params.ind} en ${params.entity} data`
  }

  static modifiedCorrectlyHere(params:{name: string, ind: number ,data:string}){
    return `se modifico el elemento ${params.name} con ${params.ind} en ${params.data} data`
  }

  static entityAlreadyExists({entity, id}:{entity:string, id: number}){
    return `el ${entity} de indice ${id} ya existe`
  }

  static CATEGORY_ALREADY_EXISTS= "esta categoria ya existe"
  static ERASED_ELEMENT= "elemento borrado correctamente"

  //auth responses
  static USER_LOGIN= "Inicio de sesion exitoso"
  static USER_FOUND_YES= "Usuario encontrado con exito"
  static USER_CREATED_YES= "Usuario creado con exito"
  static USER_BAD_EMAIL_PASSWORD= "Email o contrasena incorrecta"
  static USER_TOKEN_INVALID= "Su token es invalido o ya expiro"
  static USER_EMAIL_INVALID= "El correo electronico es invalido"
  static USER_EMAIL_EXISTS= "Este correo electronico ya esta registrado"
  static USER_FOUND_NOT= "Usuario no encontrado"
  static USER_ROLE_INVALID= "Ese rol es invalido"
  static USERS_EMPTY= "no se encontraron usuarios en Users data"
}