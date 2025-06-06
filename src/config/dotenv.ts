import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.SERVER_PORT
export const DB_URI = process.env.DB_URI
export const TOKEN_SECRET = process.env.TOKEN_SECRET
export const ORIGIN_URL = process.env.ORIGIN_URL
