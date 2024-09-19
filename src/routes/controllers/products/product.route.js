import express from 'express';
const router = express.Router();
import * as ProductController from './product.controller.js'

router.post("/create",  ProductController.create)
router.get("/get", ProductController.get)


export default router;