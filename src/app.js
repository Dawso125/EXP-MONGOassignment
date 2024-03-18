const express = require('express');
const app = express();
const port = 3000;

const mongoRoutes = require('./routes/index');

app.listen(port, () => {
  console.log('Server started at http://localhost:' + port);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', mongoRoutes);

module.exports = app;
