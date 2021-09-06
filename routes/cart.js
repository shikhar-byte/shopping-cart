const express= require('express');
const { isLoggedIn } = require('../middleware');
const router = express.Router();
const Product = require('../models/product');
const User = require('../models/user');



router.post('/user/:id/cart',isLoggedIn ,async(req,res)=>{

    try{
        const product = await Product.findById(req.params.id);

        const user = req.user;
    
        user.cart.push(product);
    
        await user.save();

        req.flash('success','Added to cart Successfully');
        res.redirect(`/user/${req.user._id}/cart`);
    }
    catch(e){
        console.log(e.message);
        req.flash('error','Unable to add this product')
        res.render('error');
    }
    
})

router.get('/user/:userId/cart',isLoggedIn, async(req,res)=>{

    try{
        const user = await User.findById(req.params.userId).populate('cart');
    
        res.render('cart/showcart',{ userCart: user.cart });
    }
    catch(e){
        req.flash('error','unable To Get the Cart at this moment');
        res.render('error');
    }
    

})

router.delete('/user/:userId/cart/:id',async(req,res)=>{

    try{
        const {userId , id} = req.params;

        const product = await Product.findById(id);
        await User.findByIdAndUpdate(userId , {$pull:{cart:id}});

        req.flash('success',`${product.name} removed from Cart`);
        res.redirect(`/user/${req.user._id}/cart`);
    }
    catch(e){
        req.flash('error','Can not remove item from cart ')
    }
    

})


router.get('/cart/payment',(req,res)=>{
    res.render('payment/payment');
})




module.exports = router;