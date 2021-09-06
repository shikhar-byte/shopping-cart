
const isLoggedIn = (req,res,next)=>{
        if(!req.isAuthenticated()){
            req.flash('error','You need to Login First');
            return res.redirect('/login');
        }
        next();
}

// const isCustomer = (req,res,next)=>{
//     if(){

//     }
//     next();
// }

module.exports = {
    isLoggedIn
 } ;