
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb://localhost:27017/";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

async function main() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db('users');
    const collection = db.collection('wallet');

    await collection.createIndex({ "_id": 1 })
    await collection.createIndex({ "balance": 1 })
    await collection.createIndex({ "transactionHistory.date": 1 })
    
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}
main().catch(console.dir);