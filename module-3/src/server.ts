import { MongoClient, ServerApiVersion } from "mongodb";
import app from "./app";

const port = 5000;

let server;

const uri =
  "mongodb+srv://aburaihanrahmani:gDng3596DSYKVjpz@raihan.0p9bes0.mongodb.net/?retryWrites=true&w=majority&appName=Raihan";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const bootstrap = async () => {
  await client.connect();

  const db = client.db("todosDB");
  const collection = db.collection("todos");

  collection.insertOne({
    title: "Prisma",
    body: "Learning prisma",
  });

  server = app.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
  });
};

bootstrap();
