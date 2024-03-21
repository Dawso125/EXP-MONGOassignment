const mongoService = require('../services/mongoService');
const { MongoClient } = require("mongodb");

// login a user using basic authorization
async function login(req, res, user_ID, Password) {
    console.log("Looking for user_ID: " + user_ID + " and Password: " + Password);
  
    try {
        const user = await mongoService.getUser(user_ID, Password); // run the function in the service
        console.log(user);
      
        if (user === null) {
            res.sendFile('/workspaces/MongoRender/src/views/notFound.html'); // show not found
        } else {
            const page = 'Login Successful! Cookie =  ' + `cookie_${user_ID}` + '<br/>'+ JSON.stringify(user) + 
                         '<br/><button onclick="window.location.assign(\'/\')">Go Home</button>' + 
                         '<br/><button onclick="window.location.assign(\'/showcookie\')">Show Cookies</button>';
            res.cookie(user_ID, 'COOKIE', { maxAge: 30000 }); // set a cookie with successful login
            res.send(page);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching user');
    }
}
async function register(req, res, user_ID, Password) {
    const client = new MongoClient(mongoService.uri);
    try {
      await client.connect();
      const database = client.db('MyDBexample');
      const users = database.collection('EXP-MONGO');
  
      // check if user exists, dont want duplicates
      const existingUser = await users.findOne({ user_ID });
      if (existingUser) {
        throw new Error('User already exists');
      }
  
      // insert new user
      await users.insertOne({ user_ID, Password });
      res.cookie(user_ID, 'COOKIE', { maxAge: 30000 });
    } finally {
      if (client) {
        await client.close();
      }
    }
  }  

// check if cookies exist
const checkCookie = (req, res, next) => {
    if (Object.keys(req.cookies).length === 0) {
      // if no cookies, go to the login
      res.redirect('/login');
    } else {
      // else, cookies exist, go to home
      next();
    }
  };

module.exports = {
    login,
    checkCookie,
    register
};
