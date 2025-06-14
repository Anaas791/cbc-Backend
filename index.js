import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import productRouter from './router/productRouter.js';
import userRouter from './router/userRouter.js';
import jwt from 'jsonwebtoken';
import orderRouter from './router/orderRouter.js';
const app = express();

app.use(bodyParser.json())

app.use(
    (req,res,next)=>{
        const tokenString = req.header("Authorization")
        if(tokenString != null){
            const token = tokenString.replace("Bearer ", "")

            jwt.verify(token, "cbc-batch-five#@2025" , 
                (err,decoded)=>{
                    if(decoded != null){
                        req.user = decoded
                        next()
                    }else{
                        console.log("invalid token")
                        res.status(403).json({
                            message : "Invalid token"
                        })
                    }
                }
            )

        }else{
            next()
        }
    }
)

mongoose.connect("mongodb+srv://admin:123@clusteranaas.jgghk.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAnaas")
.then(()=>{
    console.log("Connected to the database")
}).catch(()=>{
    console.log("Database connection failed")
})




app.use("/products", productRouter)
app.use("/users",userRouter)
app.use("/orders",orderRouter)


app.listen( 5000, 
    ()=>{
        console.log('Server is running on port 5000');
    }
)