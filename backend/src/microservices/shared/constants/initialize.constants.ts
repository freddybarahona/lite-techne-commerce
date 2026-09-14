export class InitializeConstants{
  //good responses
  static toolConnectionEstablished(params:{tool: string}){
    return `Conexion con ${params.tool} exitosa`
  }

  static infoBackActive(params:{port: number, ms_name: string}){
    return `la conexion con ${params.ms_name}-ms en http://localhost:${params.port} es exitosa`
  }

  static dbConnectionEstablished(params:{db:string, port: number}){
    return `Conexion con ${params.db} en el puerto http://localhost:${params.port} exitosa`
  }

  //bad responses
  static dbConnectionFailed(params:{db:string, port: number, error_code: string}){
    return `Conexion fallida con ${params.db} en el puerto http://localhost:${params.port}, codigo de error: ${params.error_code}`
  }

  static toolConnectionFailed(params:{tool: string, error_code: unknown |string}){
    return `Conexion fallida con ${params.tool}, codigo de error: ${params.error_code}`
  }
}