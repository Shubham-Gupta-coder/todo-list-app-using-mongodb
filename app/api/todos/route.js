import { MongoClient } from "mongodb";

// get all todos
export async function GET(request) {
  const uri = "mongodb://localhost:27017";

  const client = new MongoClient(uri);
  try {
    const database = client.db("To-Do_App");
    const to_dos = database.collection("to-dos");
    const to_do = await to_dos.find({}).toArray();
    return Response.json(to_do);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
// post a todo
export async function POST(request) {
    const body = await request.json();
  const uri = "mongodb://localhost:27017";

  const client = new MongoClient(uri);
  try {
    const database = client.db("To-Do_App");
    const to_dos = database.collection("to-dos");
    const doc = {
      title: body.title,
    };
    const result = await to_dos.insertOne(doc);
    return Response.json(
      `A document was inserted with the _id: ${result.insertedId}`
    );
  } finally {
    await client.close();
  }
}
