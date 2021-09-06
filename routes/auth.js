const router = require('express').Router();
const User = require('../models/user');
const passport = require('passport');

// router.get('/fakeUser',async(req,res)=>{
//     const user = new User({email:'sabeel@gmail.com' , username:'Sabeel'});
//     const newUser = await User.register(user,'sabeel12');
//     res.send(newUser);
// })

// Get the sign up form
router.get('/register',(req,res)=>{
    res.render('auth/signup');
})

// Register user to DB 

router.post('/register',async(req,res)=>{   

    try{
        const user = new User({ username: req.body.username, email:req.body.email , type:req.body.type});
        const newUser = await User.register(user, req.body.password);
    
        
        req.flash('success','Registered Successfully !');
        res.redirect('/products');
    }
    catch(e){
        req.flash('error',e.message);
        res.redirect('/register');
    }
    
})


// Render Login Page

router.get('/login',(req,res)=>{
    res.render('auth/login');
})

router.post('/login',
     passport.authenticate('local', 
     { 
        failureRedirect: '/login',
        failureFlash: true 
     }),
     (req,res)=>{
        req.flash('success',`Welcome Back !! ${req.user.username} `);
        res.redirect('/products');
    }
);

// Logout the user from current Session

router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success','Logged Out Successfully');
    res.redirect('/login');

})


// router.get('/forgot-password',(req,res)=>{
//      res.render('auth/forgot-password');
// })

// router.post('/forgot-password',async(req,res)=>{
//     const {email}= req.body;
//     const user= await User.findOne({email:email});

//     // Make sure user exists in DB
//     if(user){
//         console.log(user);
//         res.send(email);
//     }

   
// })


module.exports = router;