import { DataSource } from "typeorm"
import { DatabaseBootstrapParams } from "./bootstrap.params.interface"
export default class bootstrap{
  async createDatabase(params: DatabaseBootstrapParams){
    const bootstrap= new DataSource({
      type:"mssql",
      host: params.host,
      port: params.port,
      username: params.username,
      password: params.password,
      options: {encrypt: true, trustServerCertificate: true},
      synchronize: false,
      logging: false
    })
    await bootstrap.initialize()
    const queryRunner= bootstrap.createQueryRunner()
    try{
      await queryRunner.createDatabase(params.database, true)
    }finally{
      await queryRunner.release()
      await bootstrap.destroy()
    }

  }

}

/* 
oye el try finally para que 
Para garantizar la limpieza aunque falle createDatabase (manteniendo el fail-fast):
- queryRunner.release() devuelve la conexión al pool; si nunca se llama, quedan conexiones colgadas.
- bootstrap.destroy() cierra el pool temporal (el DataSource de master); sin él, el proceso conserva un pool abierto que nunca se usa.
El finally ejecuta ambos siempre (error o éxito), y como no hay catch, la excepción sigue propagándose fail-fast. Sin el bloque, un fallo en createDatabase dejaría el pozo abierto y el error de todos modos rompería el flujo.
*/