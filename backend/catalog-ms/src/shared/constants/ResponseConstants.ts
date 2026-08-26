export class ResponseConstants{
  //good responses
  static categoryCreatedCorrectly(data: string){
    return `la categoria ${data} se creo correctamente`
  }

  static dbFull(data: string, cant: number){
    return `se encontraron ${cant} elementos en ${data} data`
  }

  //bad responses
  static requiredSpace(data: string){
    return `el campo ${data} es requerido`
  }
  static onlyTypes(data: string, type: string){
    return `el campo ${data} solo admite ${type}`
  }

  static maxLength(data: string, max: number){
    return `el campo ${data} tiene un maximo de ${max} caracteres`
  }

  static dbEmpty(data: string ){
    return `no se encontraron elementos en ${data} data`
  }

  static CATEGORY_ALREADY_EXISTS= "esta categoria ya existe" 
}