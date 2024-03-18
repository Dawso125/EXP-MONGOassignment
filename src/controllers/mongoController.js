const mongoService = require('../services/mongoService');

// login a user using basic authorization
async function login(req, res, user_ID, Password) {
    console.log("Looking for user_ID: " + user_ID + " and Password: " + Password);
  
    try {
        const user = await mongoService.getUser(user_ID, Password); // run the function in the service
        console.log(user);
      
        if (user === null) {
            res.sendFile('/workspaces/MongoRender/src/views/notFound.html'); // show not found
        } else {
            res.cookie(`cookie_${user_ID}`, 'x', { maxAge: 70000 }); // set a cookie with successful login
            res.send('Login Successful ' + JSON.stringify(user) + '<br/><button onclick="window.location.assign(\'/\')">Go Home</button>');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching user');
    }
}

module.exports = {
    login
};
