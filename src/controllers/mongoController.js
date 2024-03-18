const mongoService = require('../services/mongoService');

// login a user using basic authorization
async function login(req, res, user_ID, Password) {
    console.log("Looking for user_ID: " + user_ID + " and Password: " + Password);
  
    try {
        const user = await mongoService.getUser(user_ID, Password);
        console.log(user);
      
        if (user === null) {
            res.sendFile('/workspaces/MongoRender/src/views/notFound.html');
        } else {
            res.cookie('cook1', 'x', { maxAge: 20000 });
            res.send('Login Successful ' + JSON.stringify(user));
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching user');
    }
}

module.exports = {
    login
};
