import express, {Router} from 'express';
import orderRoutes from './routes/order.route';

const router = Router();

router.use('/orders', orderRoutes);

export default router;