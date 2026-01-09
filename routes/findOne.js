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

    const database = client.db("notes");
    const notes = database.collection("notes");

    const query = { id: 1 };
    const note = await notes.findOne(query);

    console.log(note);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

run();

