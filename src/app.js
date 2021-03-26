const express = require('express');
const app = express();
require('./../mongo/connection');
const hbs = require('hbs');
const path = require('path');
const port = process.env.PORT|| 4000;


const publicDirec = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../template/views');
const partialsPath = path.join(__dirname, '../template/partials');


app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirec))


app.get('/',(req,res) => {
    res.render('index');
})

app.get('/registerMechanic',(req,res) => {
    res.render('SignupMechanic');
})

app.get('/registerCustomer',(req,res) => {
    res.render('SignupCustomer');
})


app.listen(port);