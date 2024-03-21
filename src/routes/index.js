const express = require('express');
const router = express.Router();
const mongoController = require('../controllers/mongoController');

// Middleware to parse URL encoded forms
router.use(express.urlencoded({ extended: true }));

// Home page route
router.get('/', mongoController.checkCookie, (req, res) => {
  if (req.cookies) {
    res.sendFile("/workspaces/MongoRender/views/home.html");
  }
});

// Display all cookies route
router.get('/showcookie', mongoController.checkCookie, (req, res) => {
  if (req.cookies){
  // Render the HTML file and pass active cookies data
  res.render('showcookie', { cookies: req.cookies });
  }
});

// Delete all cookies route
router.get('/clearcookie', (req, res) => {
  for (const cookieName in req.cookies) { // clear each cookie in req.cookies
    res.clearCookie(cookieName);
  }
  res.redirect('/clearedcookie'); // Redirect to showcookie route to display updated cookies
});

router.get('/clearedcookie', (req, res) => {
  res.sendFile('/workspaces/MongoRender/views/deletecookie.html');
});

// Display login HTML form route
router.get('/login', (req, res) => {
  res.sendFile('/workspaces/MongoRender/views/login.html');
});

// Post the login request route
router.post('/login', (req, res) => {
  const { user_ID, Password } = req.body;
  mongoController.login(req, res, user_ID, Password); // Call the controller endpoint
});

router.get('/register', (req, res) => {
  res.sendFile('/workspaces/MongoRender/views/register.html');
});

// Route to handle registration form submission
router.post('/register', async (req, res) => {
  const { user_ID, Password } = req.body;
  
  try {
    await mongoController.register(req, res, user_ID, Password); // Call the controller function to register the user
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user, see console for reason');
  }
});

// Route to say hello to a specific name
router.get('/say/:name', (req, res) => {
  res.send('Hello ' + req.params.name + '!');
});

module.exports = router;
