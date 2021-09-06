if(process.env.NODE_ENV!='production'){
    require('dotenv').config();
}


const express = require('express');
const app = express();
const path= require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed');
const methodOverride = require('method-override')
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
// const GoogleStrategy = require('passport-google-oauth2').Strategy;

const User = require('./models/user');

// Routes 

const productRoutes = require('./routes/product');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');



const sessionConfig ={
        secret: 'thisisnotagoodsecret',
        resave: false,
        saveUninitialized: true,
    }


// Configuring ejs , views , static files , parsing body and overriding method

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname ,'/views'));
app.use(express.static(path.join(__dirname ,'/public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));


// Configuring Sessions and flash

app.use(session(sessionConfig));
app.use(flash());


// Initilaizing Passport and Session for storing user's info

app.use(passport.initialize());
app.use(passport.session());

//  Configuring passport to use Local Strategy

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());  

// Configuring res.locals

app.use((req, res, next) => {
  
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    
    next() 
})

// connecting to DB 

mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.DB_URL, 
{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(()=>{
        console.log("DB CONNECTED!!");
    })
        .catch(err =>{
            console.log("OH NO ERROR!!");
            console.log(err);
        })

        
app.use(productRoutes);      
app.use(authRoutes);  
app.use(cartRoutes);

// seedDB();   


// Server Running at PORT 3000 

app.listen(process.env.PORT || 3000, ()=>{
    console.log("SERVER RUNNING AT PORT 3000");
})