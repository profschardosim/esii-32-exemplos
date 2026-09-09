import { Order } from '../models/order.model';
import DatabaseClient from '../database/client';
import { OrdersPubSub } from '../pubsub/OrdersPubSub';

export default class OrderService {

    private dbClient: DatabaseClient;
    private pubSub: OrdersPubSub;

    constructor() {
        this.dbClient = DatabaseClient.getInstance();
        this.pubSub = new OrdersPubSub();
        this.pubSub.connect().catch((error) => {
            console.error('Error connecting to PubSub:', error);
        });
    }

    public async getOrders(): Promise<Order[]> {
        const orders: Order[] = await this.dbClient.query('SELECT * FROM orders');
        return orders;
    }

    public async createOrder(orderData: { id: number; item: string; quantity: number; price: number }): Promise<Order> {
        try{
            const { id, item, quantity, price } = orderData;
            const newOrder = await this.dbClient.query(
                'INSERT INTO orders (id, item, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *',
                [id, item, quantity, price]
            );
            await this.pubSub.publishOrderCreated(newOrder.rows[0].id);
            return newOrder;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    }
}