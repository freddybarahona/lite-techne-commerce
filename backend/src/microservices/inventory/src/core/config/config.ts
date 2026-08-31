import { DataSource } from "typeorm";
import { generalTypes } from "../../features/product/product.types";
import { environment } from "../../infrastructure/config/env/env";
import { Inventory } from "../../domain/entities/inventory";
import {InitializeConstants} from "../../../../shared/constants/initialize.constants"
export class serverconfigurations{
    constructor(
        private dbSource: DataSource,

    ){
        this.dbSource=this.database()
        this.dbSource.initialize().then(()=>{
            console.log(InitializeConstants.dbConnectionEstablished(env, db_port))
        })
    }

    private database(): DataSource{
        this.dbSource= new DataSource({
            type: generalTypes.dataSourceTypes,
            host: environment.db_host,
            port: environment.db_port,
            username: environment.db_user,
            password: environment.db_password,
            database: environment.db_name,
            options: { encrypt: true, trustServerCertificate: true},
            entities: [Inventory],
            migrations:[],
            synchronize: true,
            logging: true
        })
        return this.dbSource
    }

    back(){

    }


}