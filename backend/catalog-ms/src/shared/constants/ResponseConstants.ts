export class ResponseConstants{
  //good responses
  static productCreatedCorrectly(data: string){
    return `el producto ${data} se creo correctamente`
  }

  static categoryCreatedCorrectly(data: string){
    return `la categoria ${data} se creo correctamente`
  }

  static dbFull(data: string, cant: number){
    return `se encontraron ${cant} elementos en ${data} data`
  }

  static somethingFoundHere(element: string, ind: number, data: string){
    return `se encontro el elemento ${element} con indice ${ind} en ${data} data`
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

  static nothingLikeThatHere(data: string, ind: number){
    return `no se encontro el elemento ${ind} en ${data} data`
  }

  static modifiedCorrectlyHere(name: string, ind: number ,data:string){
    return `se modifico el elemento ${name} con ${ind} en ${data} data`
  }

  static CATEGORY_ALREADY_EXISTS= "esta categoria ya existe"
  static ERASED_ELEMENT= "elemento borrado correctamente" 
  static PRODUCT_ALREADY_EXISTS= "este producto ya existe"
}