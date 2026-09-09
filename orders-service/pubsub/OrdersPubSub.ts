import { PubSubClient } from './client';

export class OrdersPubSub {
  private pubSubClient: PubSubClient;

  constructor() {
    this.pubSubClient = new PubSubClient();
  }

  async connect(): Promise<void> {
    await this.pubSubClient.connect();
  }

    async publishOrderCreated(orderId: string): Promise<void> {
    if (!this.pubSubClient) {
      throw new Error('PubSub client is not connected');
    }

    const channel = this.pubSubClient['channel'];
    if (!channel) {
      throw new Error('Channel is not available');
    }

    const exchange = 'orders';
    const routingKey = 'order.created';
    const message = JSON.stringify({ orderId });

    await channel.assertExchange(exchange, 'topic', { durable: true });
    channel.publish(exchange, routingKey, Buffer.from(message));
  }
}