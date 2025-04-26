import express from "express";

import {deleteProduct,getProducts,saveProducts,getProductById,updateProduct} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/",getProducts);
productRouter.post("/",saveProducts);
productRouter.delete("/:productId",deleteProduct);
productRouter.put("/:productId",updateProduct);
productRouter.get("/:productId",getProductById)

export default productRouter;