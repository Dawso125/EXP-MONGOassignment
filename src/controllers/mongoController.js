// The controller handles all of the requests


const { MongoClient } = require("mongodb");
const mongoService = require('../services/mongoService');

async function getUser(req, res) {
  const client = new MongoClient(mongoService.uri);
  const searchKey = "{ user_ID: '" + req.params.item + "' }";
  console.log("Looking for: " + searchKey);

  try {
    const user = await mongoService.getUser(req.params.user);
    console.log(user);
    res.send('Found this: ' + JSON.stringify(user));
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching user');
  } finally {
    await client.close();
  }
}

module.exports = {
  getUser
};
