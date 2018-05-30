const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (error, connection) => {
    connection.createChannel((error, channel) => {
        const queue = "task_queue";

        const message = process.argv.slice(2).join(" ") || "Hello World!";
        channel.assertQueue(queue, { durable: true });
        channel.sendToQueue(queue, new Buffer(message), { persistent: true });
        console.log(` [x] Sent ${message}`);
    })
    setTimeout(() => { connection.close(); process.exit(0) }, 500);
})