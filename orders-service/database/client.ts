import { Pool } from 'pg';

export default class DatabaseClient {
    private static instance: DatabaseClient;
    private pool: Pool;

    private constructor() {
        this.pool = new Pool({
            user: 'postgres',
            host: '0.0.0.0',
            database: 'order-service',
            password: 'postgres',
            port: 5432,
        });

        this.pool.query(`
            CREATE TABLE IF NOT EXISTS orders (
                id SERIAL PRIMARY KEY,
                item VARCHAR(255) NOT NULL,
                quantity INT NOT NULL,
                price DECIMAL(10, 2) NOT NULL
            )
        `);
    }

    public static getInstance(): DatabaseClient {
        if (!DatabaseClient.instance) {
            DatabaseClient.instance = new DatabaseClient();
        }
        return DatabaseClient.instance;
    }

    public async query(text: string, params?: any[]): Promise<any> {
        const client = await this.pool.connect();
        try {
            const res = await client.query(text, params);
            return res;
        } finally {
            client.release();
        }
    }
}