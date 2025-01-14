import mongoose from "mongoose";

const connectDB = async () => {
    try{    
        const dbconn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Successfully connected to ${dbconn.connection.host}`)
    }catch(err){
        console.error(`Error: ${err}`)
        process.exit(1)
    }
}

export default connectDB;