const { MongoClient, ServerApiVersion } = require("mongodb");

// Atlas が出した URI をそのまま使う
// <db_password> だけ Panpan810 に置換
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
    // ① 接続
    await client.connect();

    // ② 認証チェック（これが重要）
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Successfully connected to MongoDB!");

    // ③ データ登録
    const database = client.db("notes");
    const notes = database.collection("notes");

    const query = [
      {
        id: 1,
        title: "ノート１のタイトルです",
        subTitle: "ノート１のサブタイトルです",
        bodyText: "ノート１の本文です",
      },
      {
        id: 2,
        title: "ノート２のタイトルです",
        subTitle: "ノート２のサブタイトルです",
        bodyText: "ノート２の本文です",
      },
    ];

    const result = await notes.insertMany(query);
    console.log("inserted:", result.insertedCount);
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
  }
}

run();

