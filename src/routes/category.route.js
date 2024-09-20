import express from 'express';
import * as CategoryController from '../controllers/category.controller.js';
import { isAdmin } from '../middleware/role.middleware.js';

const router = express.Router();

router.post('/create', isAdmin, CategoryController.create);
router.put('/update/:id', isAdmin, CategoryController.update);
router.delete('/delete/:id', isAdmin, CategoryController.deleteCategory);
router.get('/', CategoryController.getAll); // Clients can view all categories

export default router;
