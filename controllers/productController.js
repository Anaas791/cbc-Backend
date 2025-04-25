import Product from "../models/product.js";

export function getProducts(req,res){
    Product.find().then(
        (data)=>{
            res.json(data)
        }
    )
}

export function saveProducts(req,res){

    if(req.user == null){
        res.status(403).json({
            message : "Unautherized"
        })
    }

    if(req.user.role != "admin"){
        res.status(403).json({
            message : "unautherized you need to an admin"
        })
    }
    

    const product = new Product({
        name: req.body.name,
        price : req.body.price,
        description : req.body.description
    })

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