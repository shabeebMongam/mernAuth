import dotenv from 'dotenv';
dotenv.config()
import express from 'express'
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("DB connected");
}).catch((err)=>{
 console.log(err);   
})

const app = express()
app.use(express.json())


app.listen(3000,()=>{
    console.log("On port 3000");
})


app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)