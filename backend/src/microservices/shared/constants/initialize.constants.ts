export class InitializeConstants{
  //good responses
  static infoBackActive(port: number, ms_name: string){
    return `la conexion con ${ms_name}-ms en http://localhost:${port}`
  }

  static dbConnectionEstablished(db:string, port: number){
    return `Conexion con ${db} en el puerto http://localhost:${port} exitosa`
  }

  //bad responses
  static dbConnectionFailed(db:string, port: number){
    return `Conexion fallida con ${db} en el puerto http://localhost:${port}`
  }
}