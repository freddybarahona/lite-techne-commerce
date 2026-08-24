export class ResponseConstants{
  //bad responses
  static USER_FOUND_NOT="Usuario no encontrado"
  static USER_BAD_EMAIL_PASSWORD="Email o contrasena incorrecta"
  static USER_TOKEN_INVALID="Su token es invalido o ya expiro"
  static USER_EMAIL_INVALID="El correo electronico es invalido"
  static USER_EMAIL_EXISTS="Este correo electronico ya esta registrado"
  static userMinLength(data: number){
    return `El minimo de caracteres es ${data}`
  }
  static userRequiredData(data:string){
    return `El campo ${data} es requerido`
  }
  static userDataIsInt(data: string){
    return `el campo ${data} solo acepta numero`
  }
  static userDataIsString(data: string){
    return `el campo ${data} solo acepta texto`
  }

  //good responses
  static USER_LOGIN="Inicio de sesion exitoso"
  static USER_FOUND_YES="Usuario encontrado con exito"
  static USER_CREATED_YES="Usuario creado con exito"
  static USER_ROLE_INVALID="Ese rol es invalido"
  
}