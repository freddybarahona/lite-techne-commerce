export interface Ienv{
    port: number

    db_host: string
    db_port: number
    db_user: string
    db_password: string
    db_name: string
    synchronize: boolean
    logging: boolean
    jwt_secret: string
    
    category_1_id: number
    category_1_name: string
    category_1_description: string
    category_2_id: number
    category_2_name: string
    category_2_description: string
    category_3_id: number
    category_3_name: string
    category_3_description: string
    category_4_id: number
    category_4_name: string
    category_4_description: string
}