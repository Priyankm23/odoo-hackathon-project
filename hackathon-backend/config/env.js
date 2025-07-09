import {config} from "dotenv"

config({path : `.env`});

export const{
    PORT,
    DB_URL,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,
    QSTASH_TOKEN,QSTASH_URL,SERVER_URL,
    EMAIL_PASSWORD  
}=process.env