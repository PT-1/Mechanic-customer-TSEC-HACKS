const express = require('express');
const app = express();
require('./../mongo/connection');
const hbs = require('hbs');
const path = require('path');
const port = process.env.PORT|| 4000;
const registeration = require('./../mongo/models/registerMech.js');
const session = require('express-session');
const request = require('request');
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
        res.redirect('/homepage');
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
            req.session.category = user.category;

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
    res.render('home', {username: req.session.username, category: req.session.category })
    // res.send('loggedd in'+ ' '+req.session.username + ' ' + req.session.category);
})


app.post("/getMechanics", async(req, res) => {
    
    const user = new registeration(req.body);

    mechanics_check = await registeration.find({category : "Mechanic"}, {_id : 1, address : 1, mobileNo :1, fullname : 1})
    console.log("mechanics count:", mechanics_check);

    mechanics_address = {};
    for (let index = 0; index < mechanics_check.length; index++) {
        const lat_long = await get_lat_long(mechanics_check[index].address);
        // getting printed earlier than the get_lat_long execution
        console.log(mechanics_check[index].fullname, lat_long);
        
    }
})
app.listen(port);

async function get_lat_long(address){

    var lat_long = {};
var url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicmFuaml0dHR0dCIsImEiOiJja2g3aWR4dGowOHVtMzBsbGl6d3pwYWJ5In0.slVpbEJIHo5WBwUEParWPQ&limit=1`;
    if(address === ''){ 
        // return callback('network unavailable',undefined);
        console.log("No address");
        }
            request({ url : url , json : true } , (err ,res ) => {
        if(err) {
            callback('network unavailable',undefined);
        } else if(res.body.features.length === 0) {
            callback('unable to find a location with that address',undefined);
        } else {
            console.log("Here in else request", res.body.features[0].center[0]);
            lat_long["latitude"] = res.body.features[0].center[0];
            lat_long["longitude"] = res.body.features[0].center[1];
            lat_long["place_name"] = res.body.features[0].place_name;
            // return lat_long.latitude;
            console.log("Lat long:"+ lat_long.latitude);
            callback("Fetched in callback", {
                lat : res.body.features[0].center[0],
                lon : res.body.features[0].center[1],
                location : res.body.features[0].place_name
            })
        }

    })
    // console.log("REsult" + Object.keys(result) + result.callback);

    // Not returning properly
    console.log("before returning: ", lat_long["longitude"]);
    return lat_long.latitude;
}