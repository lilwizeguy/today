// Immanuel Amirtharaj

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const path = require("path");

const app = express();

const cors = require('cors');
app.use(cors());

// app.set('port', constants.PORT);
app.set('port', 5000);


//bodyParser has to be loaded before calling the routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());

// set routes
const apiRoute = require('./routes/api');
app.use('/api', apiRoute);

// app.use(express.static(path.join(__dirname, 'cloud-notes-frontend/build')));

/*
// FOR REACT APPS
app.get('*', function(req, res) {
  console.log("Getting entries for default home");
  // res.render('index');
  // res.sendFile(path.resolve(__dirname, '/cloud-notes-frontend/public/index.html'));
  // res.json('you did it');
  console.log(path.join(__dirname+'/cloud-notes-frontend/build/index.html'));
  res.sendFile(__dirname+'/cloud-notes-frontend/build/index.html');


});

*/

module.exports = app;


// Listen on port 3001
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});