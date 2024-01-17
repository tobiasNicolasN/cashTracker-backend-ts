import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config'

interface JwtPayload {
    userId: string;
  }

export function createAccessToken(payload: JwtPayload){
    return new Promise((resolve, reject) => {
        jwt.sign({userId : payload.userId}, TOKEN_SECRET!, {expiresIn: "1d"},(error, token) => {
            if (error) reject(error)
            resolve(token)
        })
    })
}