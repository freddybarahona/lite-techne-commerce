import jwt from "jsonwebtoken"
import { Environment } from "../../core/config/env/env"
import { User } from "../../domain/entities/users"

export class JwtService{
  constructor(private readonly env: Environment){}

  generateToken(user: Omit<User, "created_at" | "updated_at">): string{
    return jwt.sign({
      id: user.user_id,
      email: user.email,
      role: user.role.role_id,
      name: user.first_name
    }, this.env.jwt_secret, {
      expiresIn: "1h"
    })
  }
}