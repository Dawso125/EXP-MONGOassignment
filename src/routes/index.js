// this is where all the routes live

const express = require('express');
const router = express.Router();
const mongoController = require('../controllers/mongoController');

router.get('/', (req, res) => { // home page
  const myquery = req.query;
  var outstring = "Page works you are at /";
  res.send(outstring);
});

router.get('/login', (req, res) => {
});

router.get('/say/:name', (req, res) => {
  res.send('Hello ' + req.params.name + '!');
});

router.get('/api/mongo/:user', mongoController.getUser); // run getUser to get the user

module.exports = router;
