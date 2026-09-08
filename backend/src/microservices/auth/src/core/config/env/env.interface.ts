export interface Ienv{
    port: number
    db_host: string
    db_port: number
    db_user: string
    db_password: string
    db_name: string
    jwt_secret: string
    role_1_id: number
    role_1_name: string
    role_1_description: string
    role_2_id: number
    role_2_name: string
    role_2_description: string
    role_3_id: number
    role_3_name: string
    role_3_description: string
    base_user_firstname: string
    base_user_lastname: string
    base_user_email: string
    base_user_password: string
    base_user_isActive: boolean
}