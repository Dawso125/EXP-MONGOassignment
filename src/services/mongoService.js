// establish connection to mongoDB

// all of the logic is done in the service


const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://MongoUser:AY4WJU4csgbzGG9O@cluster0.2opxftr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// get a user
async function getUser(username, password) {
    const client = new MongoClient(uri);
    try {
      await client.connect();
      const database = client.db('MyDBexample');
      const users = database.collection('EXP-MONGO');
      const query = { user_ID: username, Password: password };
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
