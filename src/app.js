const express = require('express');
const app = express();
require('./../mongo/connection');
const hbs = require('hbs');
const path = require('path');
const port = process.env.PORT|| 4000;
const registeration = require('./../mongo/models/registerMech.js');
const session = require('express-session');
app.use(express.urlencoded());
app.use(express.json());

const publicDirec = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../template/views');
const partialsPath = path.join(__dirname, '../template/partials');


app.set('view engine', 'hbs');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    
}))
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirec))


app.get('',(req,res) => {
    res.render('index');
})

app.get('/register',(req,res) => {
    res.render('Signup');
})
app.post('/register',async (req,res) => {
    // console.log(req.body.username);
    // console.log('initialized');
    const user = new registeration(req.body);

    username_check = await registeration.aggregate(
        [
          {
            $match: {
              username: req.body.username
            }
          },
          {
            $count: "username_count"
          }
        ]
    )
    // console.log(registeration.find({username : "Rajnikant"}).count());
    console.log("username count:", username_check);

    if(username_check.length == 0){
        user.save().then((err)=>{
            console.log(err);
            // res.redirect(`/authenticate?username=${user.username}&password=${user.password}`)
        }).catch((err)=>{
            if(err){
                res.send(err)
            }
        })
    }
    else{
        console.log("Already exists!");
    }
    
})

app.post('/login',async (req,res) => {
   
    await registeration.findOne({username : req.body.username ,password : req.body.password},function(err,user) {

        if(err){
            res.statusCode(500);
        }
        
        if(user) {
            req.session.username = req.body.username;
            console.log('login found');
            // const userJson = {
            //     fname : user.fname,
            //     lname: user.lname,
            //     email: user.email,
            //     username: user.username
            // }
            // let token = jwt.sign(userJson,"qwerty");
            // res.cookie('authenticationToken',token);
            
            
            res.redirect('/homepage')
        } else {
            res.send({
                err:'No such user found!',
            })
        }
    })
})


app.get('/homepage',(req,res) => {

    // console.log(req.session.username);
    res.send('loggedd in'+ ' '+req.session.username);
})


app.listen(port);