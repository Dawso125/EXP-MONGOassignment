const express = require('express');
var cookieParser = require('cookie-parser')
const app = express();
const port = 3000;

const mongoRoutes = require('./src/routes/index');

app.listen(port, () => {
  console.log('Server started at http://localhost:' + port);
});

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/', mongoRoutes);


module.exports = app;
