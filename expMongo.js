const { MongoClient } = require("mongodb");

// The uri string must be the connection string for the database (obtained on Atlas).
const uri = "mongodb+srv://MongoUser:AY4WJU4csgbzGG9O@cluster0.2opxftr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// --- This is the standard stuff to get it to work on the browser
const express = require('express');
const app = express();
const port = 3000;
app.listen(port);
console.log('Server started at http://localhost:' + port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes will go here

// Default route:
app.get('/', function(req, res) {
  const myquery = req.query;
  var outstring = "Page works you are at /";
  res.send(outstring);
});

app.get('/say/:name', function(req, res) {
  res.send('Hello ' + req.params.name + '!');
});


// Route to access database:
app.get('/api/mongo/:user', function(req, res) {
const client = new MongoClient(uri);
const searchKey = "{ user_ID: '" + req.params.item + "' }";
console.log("Looking for: " + searchKey);

async function run() {
  try {
    const database = client.db('MyDBexample');
    const users = database.collection('EXP-MONGO');

    // Hardwired Query for a part that has partID '12345'
     //const query = { partID: '12345' };
    // But we will use the parameter provided with the route
    const query = { user_ID: req.params.user };

    const user = await users.findOne(query);
    console.log(user);
    res.send('Found this: ' + JSON.stringify(user));  //Use stringify to print a json

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
});
