import express, {Router} from 'express';
import OrderController from '../controllers/order.controller';

const router = Router();
const orderController = new OrderController();

router.get('/', (req, res) => {
    return orderController.getOrders(req, res);
});

router.post('/', (req, res) => {
    return orderController.createOrder(req, res);
});

export default router;