const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//Import routings
const authRoutes = require('./router/auth');


//Configure Body Parse
//app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Configure Header HTTP - CORS
app.use(cors());

//Configure routings
app.use('/auth', authRoutes)

module.exports = app;