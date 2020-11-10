// server.js
require('./models/db');
const express = require('express');
const employeeController =
    require('./controllers/employeeController')
const exphbs = require('express-handlebars');
const path = require('path');
const bodyparser = require('body-parser');
const app = express();
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: __dirname + '/views/layouts/',
    allowProtoMethodsByDefault: true
})); 
app.set('view engine', 'hbs');

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.listen('3000', () => {
    console.log('Express Server started at port : 3000')
});
app.use('/employee', employeeController);
app.use('/', (req, res) => {
    res.send('Hello World! This is the home page.')
});
