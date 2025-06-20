import { MongoClient, ServerApiVersion } from "mongodb";
import app from "./app";
import { client } from "./config/mongoDB";

const port = 5000;

let server;

const bootstrap = async () => {
  await client.connect();

  server = app.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
  });
};

bootstrap();
