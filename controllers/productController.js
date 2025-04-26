import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function getProducts(req,res){
   try{
    if(isAdmin(req)){
        const products = await Product.find()
        res.json(products)
    }else{
        const products = await Product.find({isAvailable : true})
        res.json(products)
    }

   }catch(err){
    res.json({
        message : "Failed to get product",
        error : err
    })
   }
}

export function saveProducts(req,res){

    if(!isAdmin(res)){
        res.status(403).json({
            message : "You are not autherized to add product"
        })
        return
    }

    const product = new Product(
        req.body
    )

    product.save().then(()=>{
        res.json({
            message : "Product added successful",
        });
    }).catch(()=>{
        res.json({
            message : "Failed to add product",
        })
    })
}

export async function deleteProduct(req,res){

    if(!isAdmin(req)){
        res.status(403).json({
            message : "You are not autherized to delete product"
        })
        return
    }
    try{
        await Product.deleteOne({productId : req.params.productId})

        res.json({
            message : "Product deleted successfully"
        })
    }catch(err){
        res.status(500).json({
            message : "Failed to delete product",
            error : err
        })
    }
}

export async function updateProduct(req,res){

    if(!isAdmin(req)){
        res.status(403).json({
            message : "Your noty autherized to update product"
        })
        return
    }

    const productId = req.params.productId
    const updatingData = req.body

    try{
        await Product.updateOne(
            {productId : productId},
            updatingData
        )

        res.json(
            {
                message : "Product update successfully"
            }
        )
    }catch(err){
        res.status(500).json({
            message : "internal server error",
            error : err
        })
    }
}

export async function getProductById(req,res){
    const productId = req.params.productId

    try{
        const product = await Product.findOne(
            {productId : productId}
        )

        if(product == null){
            res.status(404).json({
                message : "product not found"
            })
            return
        }
        if(product.isAvailable){
            res.json(product)
        }else{
            if(!isAdmin(req)){
                res.status(404).json({
                    message : "product not found"
                })
                return
            }else{
                res.json(product)
            }
        }
    }catch(err){
        res.status(500).json({
            message : "internal server error",
            error : err
        })
    }
}