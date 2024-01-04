// import  amqp from "amqplib/callback_api.js";

// class RabbitMq {
//   constructor() {
//     this.startServer();
//   }

//   async startServer() {
//     try {
//       console.log("startServer==>");

//       await this.connect()
//         .then(
//           (res) => {
//             this.channel = res;
//             console.log("RabitMQ Connection successfully created");

//             this.channel.prefetch(1);
//           },
//           (error) => {
//             console.log("Error of rabbit queue", error);
//             return error;
//           }
//         )
//         .catch((err) => {
//           console.log("The err of rb is ", err);
//         });
//     } catch (error) {
//       console.log("Error of rb is ", error);
//     }
//   }

//   connect() {
//     try {
//       return new Promise((resolve, reject) => {
//         amqp.connect(process.env.RABITMQ_CON_URL, (err, conn) => {
//           if (err) {
//             console.log("the rabbit error", err);
//             reject(err);
//           }
//           conn?.createChannel((eror, ch) => {
//             if (eror) {
//               console.log("the error is ", eror);
//               reject(eror);
//             }
//             resolve(ch);
//           });
//         });
//       });
//     } catch (error) {
//       console.log("error while connecting rabbit", error);
//     }
//   }

//   createQueue(queue) {
//     console.log(queue, "queue");
//     this.channel.assertQueue(queue, { durable: false }, (err) => {
//       console.log(err, "err:");
//     });
//   }

//   consumeQueue(queueName, cb) {
//     console.log("CONSUME QUEUE WORKING HERE");
//     this.channel.prefetch(1);
//     this.channel.consume(queueName, async (msg) => {
//       if (!msg) return;
//       const data = msg.content.toString();
//       await cb(data);
//       this.channel.ack(msg);
//     });
//   }

//   sendToqueue(queue, data) {
//     try {
//       console.log("queue===>", queue);
//       console.log("send data====>", data);

//       this.channel.sendToQueue(`${queue}`, Buffer.from(data));
//     } catch (error) {
//       console.log("rabbit create queue error is ", error, queue.toString());
//     }
//   }

//   async send(queue, msg) {
//     try {
//       if (Object.keys(this.channel).length > 0) {
//         await this.channel.assertQueue(queue, { durable: false });
//         const send = this.channel.sendToQueue(queue, Buffer.from(msg));
//         return send;
//       } else {
//         this.connect();
//       }
//       return true;
//     } catch (error) {
//       console.error('send channel error', error);

//       await this.connect();
//       return 'Something went wrong. Please try again later.';
//     }
//   }
// }

// export default new RabbitMq();

//2

// import amqp from "amqplib/callback_api.js";

// class RabbitMq {
//   constructor() {
//       this.startServer();
//   }

//   async startServer() {
//     try {
//       console.log("startServer==>");

//       const connection = await this.connect();

//       this.channel = await connection.createChannel();
//       console.log("RabbitMQ Connection successfully created");

//       this.channel.prefetch(1);
//     } catch (error) {
//       console.log("Error connecting to RabbitMQ:", error);
//     }
//   }

//   connect() {
//     return new Promise((resolve, reject) => {
//       amqp.connect(process.env.RABITMQ_CON_URL, (err, conn) => {
//         if (err) {
//           console.log("Error connecting to RabbitMQ:", err);
//           reject(err);
//         }
//         resolve(conn);
//       });
//     });
//   }

//   async createQueue(queue) {
//     try {
//       console.log(queue, "queue");
//        await this.startServer();
//       await this.channel.assertQueue(queue, { durable: false });
//       console.log(`Queue '${queue}' asserted successfully`);
//     } catch (error) {
//       console.log(`Error creating queue '${queue}':`, error);
//     }
//   }

//   // async consumeQueue(queueName, cb) {
//   //   try {
//   //     console.log("CONSUME QUEUE WORKING HERE");

//   //     await this.createQueue(queueName); // Ensure queue exists

//   //     this.channel.prefetch(1);
//   //     this.channel.consume(queueName, async (msg) => {
//   //       if (!msg) return;
//   //       const data = msg.content.toString();
//   //       await cb(data);
//   //       this.channel.ack(msg);
//   //     });
//   //   } catch (error) {
//   //     console.log(`Error consuming queue '${queueName}':`, error);
//   //   }
//   // }

//   async consumeQueue(queueName, cb) {
//     try {
//       console.log("CONSUME QUEUE WORKING HERE");

//       await this.createQueue(queueName); // Ensure queue exists

//       this.channel.prefetch(1);
//       this.channel.consume(
//         queueName,
//         async (msg) => {
//           if (!msg) return;
//           const data = msg.content.toString();
//           await cb(data);

//           // Manually acknowledge the message after processing
//           this.channel.ack(msg); // This acknowledges the message
//         },
//         { noAck: false } // Setting noAck to false here for manual acknowledgment
//       );
//     } catch (error) {
//       console.log(`Error consuming queue '${queueName}':`, error);
//     }
//   }

//   sendToQueue(queue, data) {
//     try {
//       console.log("queue===>", queue);
//       console.log("send data====>", data);

//       this.channel.sendToQueue(queue, Buffer.from(data));
//     } catch (error) {
//       console.log("RabbitMQ send queue error:", error);
//     }
//   }

//   async send(queue, msg) {
//     try {
//       await this.createQueue(queue); // Ensure queue exists

//       const send = this.channel.sendToQueue(queue, Buffer.from(msg));
//       return send;
//     } catch (error) {
//       console.error('RabbitMQ send error:', error);
//       throw new Error('RabbitMQ send error');
//     }
//   }
// }

// export default new RabbitMq();


//3
import amqp from "amqplib/callback_api.js";

class RabbitMq {
  constructor() {
    this.startServer();
  }

  async startServer() {
    try {
      console.log("startServer==>");

      const connection = await this.connect();

      this.channel = await connection.createChannel();
      console.log("RabbitMQ Connection successfully created");

       this.channel.prefetch(1);
    } catch (error) {
      console.log("Error connecting to RabbitMQ:", error);
    }
  }

  connect() {
    return new Promise((resolve, reject) => {
      amqp.connect(process.env.RABITMQ_CON_URL, (err, conn) => {
        if (err) {
          console.log("Error connecting to RabbitMQ:", err);
          reject(err);
        }
        resolve(conn);
      });
    });
  }

  async createQueue(queue) {
    try {
      console.log(queue, "queue");
     // await this.startServer();
      await this.channel.assertQueue(queue, { durable: false });
      console.log(`Queue '${queue}' asserted successfully`);
    } catch (error) {
      console.log(`Error creating queue '${queue}':`, error);
    }
  }

  async consumeQueue(queueName, cb) {
    try {
      console.log("CONSUME QUEUE WORKING HERE");

     // await this.createQueue(queueName); // Ensure queue exists

      this.channel.prefetch(1);
      this.channel.consume(
        queueName,
        async (msg) => {
          if (!msg) return;
          const data = msg.content.toString();

          try {
            await cb(data);
            this.channel.ack(msg); // Acknowledge the message after successful processing
          } catch (error) {
            console.error('Error processing message:', error);
           
          }
        },
       // { noAck: false } // Setting noAck to false here for manual acknowledgment
      );
    } catch (error) {
      console.log(`Error consuming queue '${queueName}':`, error);
    }
  }

  sendToQueue(queue, data) {
    try {
      console.log("queue===>", queue);
      console.log("send data====>", data);

      this.channel.sendToQueue(queue, Buffer.from(data));
    } catch (error) {
      console.log("RabbitMQ send queue error:", error);
    }
  }

  async send(queue, msg) {
    try {
      await this.createQueue(queue); // Ensure queue exists

      const send = this.channel.sendToQueue(queue, Buffer.from(msg));
      return send;
    } catch (error) {
      console.error('RabbitMQ send error:', error);
      throw new Error('RabbitMQ send error');
    }
  }
}

export default new RabbitMq();

