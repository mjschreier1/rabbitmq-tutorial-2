const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (error, connection) => {
    connection.createChannel((error, channel) => {
        const queue = "task_queue";

        channel.assertQueue(queue, { durable: true });
        console.log(` [*] Waiting for messages in ${queue}. To exit, press CTRL+C`);

        channel.consume(queue, message => {
            const seconds = message.content.toString().split(".").length - 1;
            console.log(` [x] Received ${message.content}`);
            setTimeout(() => console.log(" [x] Done"), seconds * 1000);
        }, { noAck: true })
    })
})