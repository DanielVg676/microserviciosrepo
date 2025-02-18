import amqp from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

const RABBITMQ_URL = process.env.RABBIT_HOST;

export async function userEvents() {
    try{
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        
        const exchange = 'user_event';
        const queue = 'user_created_queue';
        const routingKey = 'user.created';

        await channel.assertExchange(exchange, "topic", { durable: true });
        await channel.assertQueue(queue, { durable: true });
        await channel.bindQueue(queue, exchange, routingKey);

        console.log(`Waiting for messages in ${queue}`);
        
        let response = {};
        channel.consume(queue, (msg) => {
            if (msg !== null) { // Corregido de "msq" a "msg"
                response = JSON.parse(msg.content.toString());
                console.log(response);
                channel.ack(msg);
            }
        }, { noAck: false});

        connection.on('close', () => {
            console.error('Conexion cerrada, intendando reconectar en 5s...');
            setTimeout(userEvents, 5000);
        });
    } catch(error){
        console.log('Error al cobnectar con rabbitMQ:', error.message);
        console.log('Reintentando en 5s....');
        setTimeout(userEvents,5000)
    }
}
