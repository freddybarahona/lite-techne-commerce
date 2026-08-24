import { User } from "../../domain/entities/users"
import  jwt  from "jsonwebtoken" //jwt != Jwt
import { env } from "../../infrastructure/env/env"
export class JwtService {
  generateToken(user: Omit<User, "created_at" | "updated_at">): string{
    return jwt.sign({
      id: user.user_id,
      email:user.email,
      role: user.role.role_id,
      name: user.first_name
    },env.jwtSecret,{
      expiresIn: "1h"
    })
  }
}

/* 
composicion JWT:
1. header: el tipo de escritura
2. payload: los datos o claims que tu quieras mandar
3. signature: la firma digital unica, tambien permite generar el tiempo de vigencia
 */