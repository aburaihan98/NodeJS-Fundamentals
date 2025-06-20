import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
  "mongodb+srv://aburaihanrahmani:gDng3596DSYKVjpz@raihan.0p9bes0.mongodb.net/?retryWrites=true&w=majority&appName=Raihan";

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
