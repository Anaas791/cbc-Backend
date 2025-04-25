import express from 'express';
import bodyParser from 'body-parser';
import mongoose, { Schema } from 'mongoose';
import productRouter from './router/productRouter.js';
import userRouter from './router/userRouter.js';
import jwt from 'jsonwebtoken';


let app=express();

app.use(bodyParser.json())

app.use(
    (req,res,next)=>{
        const tokenString = req.header("Autherization")
        if(tokenString != null){
            const token = tokenString.replace("Bearer","")

          jwt.verify(token, "cbc-batch-five#@2025" ,
            (err,decoded)=>{
                if(decoded != null){
                    req.user = decoded
                    next()
                }else{
                    console.log("invalid token")
                    res.status(403).json({
                        message : "invalid token"
                    })
                }
            }
          )
        }else{
        next()
        }
    }
)

mongoose.connect("mongodb+srv://admin:123@clusteranaas.jgghk.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAnaas").
then(()=>{
    console.log("connected to the database")
}).catch(()=>{
    console.log("database connection fail")
})

//mongodb+srv://admin:123@clusteranaas.jgghk.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAnaas

app.use("/products",productRouter)
app.use("/users",userRouter)

app.listen(5000 , ()=>
{
    console.log('Server is running in port 5000')
})