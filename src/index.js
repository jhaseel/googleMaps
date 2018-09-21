const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myconnection = require('express-myconnection');
var bodyParser = require('body-parser');
const app = express();

//settins
const PORT = process.env.PORT || 5000;
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database : 'maps'
  }, 'single' ));
  

//vistas
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, "views"));

//static files
app.use(express.static(__dirname + '/public'));

//middlewares
app.use(morgan('dev') );
app.use(express.json());

//routes
const customerRouters = require('./routes/maps');
app.use('/', customerRouters);


// server 
app.listen(PORT , () => {
    console.log('server on port',PORT);
  });
  