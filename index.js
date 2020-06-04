const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const connect = require('./database/connect');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

connect.createConnection();

app.use('/api/v1/practica-ferran-dragomir/', require('./routes/searchRoutes'));
app.use('/api/v1/practica-ferran-dragomir', require('./routes/userRoutes'));
app.use('/api/v1/practica-ferran-dragomir', require('./routes/filterRoutes'));
app.use('/api/v1/practica-ferran-dragomir', require('./routes/questionRoutes'));


app.listen(process.env.PORT, function() {
    console.log('Server start!', 
        `Example app listening on port ${process.env.PORT}!`);
});