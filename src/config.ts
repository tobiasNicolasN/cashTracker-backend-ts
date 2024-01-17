import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT
export const DB_URI = process.env.DB_URI
export const TOKEN_SECRET = process.env.TOKEN_SECRET
