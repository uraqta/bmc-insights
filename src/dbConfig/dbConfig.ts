import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on('connected',()=>{
        console.log("mongo db connected")
        })
        connection.on('error',(err)=>{
            console.log("not connected"+err)
        })

        
    } catch (error) {
        console.log("something went wrong")
        console.log(error)
        
    }
    
}