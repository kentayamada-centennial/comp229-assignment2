import express from "express";
import productCtrl from "../controllers/product.controller.js"

const router = express.Router();

// Define routes for '/api/products'
router.route("/api/products")
  .get(productCtrl.list)
  .post(productCtrl.create)
  .delete(productCtrl.removeAll)

// Define routes for '/api/products/:productId'
router.param("productId", productCtrl.productByID)
router.route("/api/products/:productId")
  .get(productCtrl.read)
  .put(productCtrl.update)
  .delete(productCtrl.removeOne)

export default router;
