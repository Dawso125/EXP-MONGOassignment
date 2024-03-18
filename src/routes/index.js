// this is where all the routes live

const express = require('express');
const router = express.Router();
const mongoController = require('../controllers/mongoController');
router.use(express.urlencoded({ extended: true }));// to use URL encoded forms

router.get('/', (req, res) => { // home page
    res.sendFile("/workspaces/MongoRender/src/views/home.html");
});

router.get('/showcookie', function (req, res) {
    console.log('Cookies: ', req.cookies);
    res.send(req.cookies); //Send the cookies
  });

// display login html form
router.get('/login', (req, res) => {
    res.sendFile('/workspaces/MongoRender/src/views/login.html');
});

// post the login request
router.post('/login', (req, res) => {
    const { user_ID, Password } = req.body;
    mongoController.login(req, res, user_ID, Password); // call the controller endpoint
  });

router.get('/say/:name', (req, res) => {
  res.send('Hello ' + req.params.name + '!');
});

router.get('/api/mongo/:user', mongoController.login);

module.exports = router;
