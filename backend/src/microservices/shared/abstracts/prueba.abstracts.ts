export abstract class ControllersAbstracts{
  
}


export abstract class Coche{
  abstract conducir(): void
}

export class Berlina extends Coche{
  conducir(): void {
    throw new Error("Method not implemented.")
  }
}

export class Coupe extends Coche{
  conducir(){
    console.log("Conduciendo un coupe")
  }
}

//puedes implementar el metodo abstracto con o sin retorno explicito

//los metodos abstractos no se instancian las normales si