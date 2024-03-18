// establish connection to mongoDB

// all of the logic is done in the service


const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://MongoUser:AY4WJU4csgbzGG9O@cluster0.2opxftr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function getUser(user) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db('MyDBexample');
    const users = database.collection('EXP-MONGO');
    const query = { user_ID: user };
    return await users.findOne(query);
  } finally {
    await client.close();
  }
}

// exports stuff like 
module.exports = {
  getUser,
  uri
};
