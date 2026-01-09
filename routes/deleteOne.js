const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGODB_URI;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const notes = client.db("notes").collection("notes");

    const filter = { id: 2 };
    const result = await notes.deleteOne(filter);

    console.log(result);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

run();

