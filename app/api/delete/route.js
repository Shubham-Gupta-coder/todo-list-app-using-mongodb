import { MongoClient } from "mongodb";

// post a todo
export async function POST(request) {
  const body = await request.json();
  const uri = "mongodb://localhost:27017";

  const client = new MongoClient(uri);
  try {
    const database = client.db("To-Do_App");
    const to_dos = database.collection("to-dos");
    const query = { title: body.title };
    const result = await to_dos.deleteOne(query);
    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
    return Response.json(
      result
    );
  } finally {
    await client.close();
  }
}
