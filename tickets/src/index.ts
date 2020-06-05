import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from './nats-wrapper'
const start = async () => {

  if(!process.env.JWT_KEY){
    throw new Error('JWT_KEY must be defined');
  }

  if(!process.env.MONGO_URI){
    throw new Error('Mongo uri must be defined');
  }

  try {
    await natsWrapper.connect('ticketing','123', 'http://nats-srv:4222');
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(`Connected to mongo DB`);
  } catch (err) {
    console.error(err);
  }
  const port = 3000;
  app.listen(port, () => {
    console.log(`Auth Server is running on port ${port}..`);
  });
};

start();
