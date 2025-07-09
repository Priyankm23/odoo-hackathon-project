import mongoose from "mongoose";

import { DB_URL} from "../config/env.js"

if(!DB_URL) {
    throw new Error('please define the MONGODB_URL environment variable inside the .env.')
}

//connect to mongo db

const connectToDatabase= async ()=>{
    try {
        await mongoose.connect(DB_URL);

        console.log(`connected to database in development mode`)
        
    } catch (error) {
        console.log('Error connecting to the database:',error)
    }
}

export default connectToDatabase;