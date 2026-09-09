import { Order } from '../models/order.model';
import DatabaseClient from '../database/client';

export default class OrderService {

    private dbClient: DatabaseClient;

    constructor() {
        this.dbClient = DatabaseClient.getInstance();
    }

    public async getOrders(): Promise<Order[]> {
        const orders: Order[] = await this.dbClient.query('SELECT * FROM orders');
        return orders;
    }

    public async createOrder(orderData: { id: number; item: string; quantity: number; price: number }): Promise<Order> {
        const { id, item, quantity, price } = orderData;
        const newOrder = await this.dbClient.query(
            'INSERT INTO orders (id, item, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *',
            [id, item, quantity, price]
        );
        return newOrder;
    }
}