import express from 'express';
import { createOrder, getAllOrders } from '../controllers/order.controller.js';
import { getOrderByType } from '../controllers/order.controller.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/:type', getOrderByType);

export default router;