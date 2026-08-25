export class SeedConstants{
  //good responses
  static categoryCreated(data: string, id: number){
    return `la categoria ${data} con id: ${id} fue creada con exito`
  }

  //bad responses
  static categoryNotExist(data: string){
    return `la categoria ${data} no existe`
  }
}