import amqp from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

const RABBITMQ_URL = process.env.RABBIT_HOST;
const RABBITMQ_EXCHANGE = "user_event";
const RABBITMQ_ROUTING_KEY = "user.created";

export async function userCreatedEvent(user) {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        // Declarar el exchange
        await channel.assertExchange(RABBITMQ_EXCHANGE, "topic", { durable: true });

        // Publicar el evento
        const message = JSON.stringify(user);
        channel.publish(RABBITMQ_EXCHANGE, RABBITMQ_ROUTING_KEY, Buffer.from(message));

        console.log(`[x] Exchange "${RABBITMQ_EXCHANGE}", routing key "${RABBITMQ_ROUTING_KEY}": ${message}`);

        // Cerrar conexión con un pequeño delay
        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.error('Error publicando el evento:', error.message);
    }
}
