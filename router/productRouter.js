import express from "express";

import {deleteProduct,getProducts,saveProducts,getProductById,updateProduct} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/",getProducts);
productRouter.post("/",saveProducts);
/*productRouter.delete("/",deleteProduct);
productRouter.put("/",updateProduct);
productRouter.get("/",getProductById) */

export default productRouter;