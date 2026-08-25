export class initializeConstants{
    
    //good responses
    static infoBackActive(port: number){
        return `conexion con catalog-ms en http://localhost:${port}`
    }
    static dbConnectionEstablished(db:string, port: number){
      return `Conexion con ${db} en el puerto http://localhost:${port} exitosa`
    }

    //bad responses
    static dbConnectionFailed(db:string, port: number){
      return `Conexion fallida con ${db} en el puerto http://localhost:${port}`
    }
}