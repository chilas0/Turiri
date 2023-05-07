//Start import libraries 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
//End libraries

//Start import routings
const authRoutes = require('./router/auth');
const userRoutes = require('./router/user');
//End import routings

//Start configure Body Parse
app.use(bodyParser.json());
//End configure Body Parse

//Configure Header HTTP - CORS
app.use(cors());
//End configure Header HTTP - CORS

//Start configure routings
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
//End cconfigure routings

module.exports = app;