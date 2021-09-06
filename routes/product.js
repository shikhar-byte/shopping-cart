const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Review = require('../models/review');
const {isLoggedIn} = require('../middleware');

router.get('/', (req,res)=>{
    res.render('products/landing');
})

//Display all the products

router.get('/products', async(req,res) =>{

    try{
        const products = await Product.find({});    
        res.render('products/index',{products }); 
    }
    catch(e){
        console.log("SOMETHING WENT WRONG !!");
        req.flash('error','Cannot find Products');
        res.render('error');
    }
    
})

// Get the form to create New Product

router.get('/products/new',isLoggedIn , (req,res)=>{


    res.render('products/new');
})


// Create New Product

router.post('/products', isLoggedIn , async(req,res)=>{

    try{
        await Product.create(req.body.product);
        req.flash('success','Product created Successfully!');
        res.redirect('/products');
    }
    catch(e){
        console.log(e.message);
        req.flash('error','Cannot Create Product , something went wrong');
        res.redirect('/error');
    }
})

// Show particular Product

router.get('/products/:id' , async(req,res) =>{
    try{
        const product = await Product.findById(req.params.id).populate('reviews');
        res.render('products/show',{ product });
    }
    catch(e){
        console.log(e.message);
        req.flash('error','Cannot find Product');
        res.redirect('/error');
    }
})

// Show form to Edit particular Product

router.get('/products/:id/edit' , isLoggedIn , async(req,res)=>{
    const product = await Product.findById(req.params.id);
    res.render('products/edit',{product});
})

// Update Particular Product

router.patch('/products/:id' , isLoggedIn , async(req,res) =>{
    try{
        await Product.findByIdAndUpdate(req.params.id , req.body.product) ;
        req.flash('success','Updated Successfully');
        res.redirect(`/products/${req.params.id}`);
    }
    catch(e){
        console.log(e.messgae);
        req.flash('error','Cannot Update Product');
        res.render('error');
    }
})

// Delete particular Product

router.delete('/products/:id' , isLoggedIn , async(req,res) =>{
    try{
        await Product.findByIdAndDelete(req.params.id);
        req.flash('success','Product Deleted Successfully');
        res.redirect('/products');
    }
    catch(e){
        console.log(e.message);
        req.flash('error','Cannot Delete Product');
        res.render('error');
    }
})


// Create new Review / Comment

router.post('/products/:id/review', isLoggedIn , async(req,res)=>{

    const product = await Product.findById(req.params.id);


    const review = new Review({
        user:req.user.username,
        ...req.body
    });

    product.reviews.push(review);

    await review.save();
    await product.save();


    res.redirect(`/products/${req.params.id}`);
})

router.delete('/products/:id/review/:reviewId', isLoggedIn , async(req,res)=>{
    
    const {id , reviewId} = req.params;
    await Product.findByIdAndUpdate(id , {$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/products/${id}`);
})


router.get('/error', (req,res)=>{
    res.status(404).render('error');
})
module.exports = router;