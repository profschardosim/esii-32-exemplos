import amqp, {Channel} from 'amqplib';

export class PubSubClient {
  private channel: Channel | null = null;
  

  async connect(): Promise<void> {
    const connection = await amqp.connect('amqp://admin:securepassword123@localhost:5672');
    // get or create a channel
    try{
        this.channel = await connection.createChannel();
    } catch (error) {
        console.error('Error creating channel:', error);
        throw error;
    }

  }

}