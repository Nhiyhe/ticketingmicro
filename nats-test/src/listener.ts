import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreatedListener } from "./events/ticket-created-listeners";
//client or stan

console.clear();
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  stan.on("close", () => {
    console.log("Listener connection closed");
    process.exit();
  });
  // console.log("Listener connected to NAT");
  // const options = stan.subscriptionOptions().setManualAckMode(true);

  // const subscription = stan.subscribe('ticket:created','ticket-queue-group', options);
  // subscription.on('message', (msg:Message) => {
  //     console.log(`Number# ${msg.getSequence()}, ${JSON.parse(msg.getData().toString())}`);
  //     msg.ack();
  // })

  new TicketCreatedListener(stan).listen();
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());


