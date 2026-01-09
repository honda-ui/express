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
    // ① 接続
    await client.connect();

    const database = client.db("notes");
    const notes = database.collection("notes");

    // ② 更新条件（id = 1）
    const filter = { id: 1 };

    // ③ 更新内容
    const update = {
      $set: {
        title: "ノート１のタイトル（更新後）",
        bodyText: "ノート１の本文（更新後）",
      },
    };

    // ④ updateOne 実行
    const result = await notes.updateOne(filter, update);

    console.log(result);
  } catch (e) {
    console.error(e);
  } finally {
    // ⑤ クローズ
    await client.close();
  }
}

run();

