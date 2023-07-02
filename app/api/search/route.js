
import { MongoClient } from "mongodb";

// post a todo
export async function POST(request) {
  const body = await request.json();
  const uri = "mongodb://localhost:27017";

  const client = new MongoClient(uri);
  try {
    const database = client.db("To-Do_App");
    const to_dos = database.collection("to-dos");
    const result = await to_dos.aggregate([
      {
        $match: {
          $or: [{ title: { $regex: body.title, $options: "i" } }],
        },
      },
    ]).toArray()
    return Response.json(result);
  } finally {
    await client.close();
  }
}
