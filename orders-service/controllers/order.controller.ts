import { Request, Response } from 'express';
import Order from '../models/order.model';
import OrderService from '../services/order.service';

export default class OrderController {
    private orderService: OrderService;
    
    constructor() {
        this.orderService = new OrderService();
    }

    public async getOrders(req: Request, res: Response): Promise<void> {
        try {
            // Logic to fetch orders from the database or service
            const orders = await this.orderService.getOrders();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching orders', error });
        }
    }

    public async createOrder(req: Request, res: Response): Promise<void> {
        try {
            const { id, item, quantity, price } = req.body;
            const newOrder = new Order(id, item, quantity, price);
            const orderCreated = await this.orderService.createOrder(newOrder);
            res.status(201).json(orderCreated.rows[0]); // Assuming the service returns the created order
        } catch (error) {
            res.status(500).json({ message: 'Error creating order', error });
        }
    }
}