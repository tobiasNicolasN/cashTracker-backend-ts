import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config'

export interface IJwtPayload {
    userId: string;
  }

export function createAccessToken(payload: IJwtPayload){
    return new Promise((resolve, reject) => {
        jwt.sign({userId : payload}, TOKEN_SECRET!, {expiresIn: "1d"},(error, token) => {
            if (error) reject(error)
            resolve(token)
        })
    })
}