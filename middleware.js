module.exports.isloggedin= (req,res,next)=>{
    //checking you are logged in or not

if(!req.isAuthenticated()){
    req.session.redirectUrl=req.originalUrl;
    req.flash("error","you must be logged first to create a new listing");
    return res.redirect("/login");
}

next();
};

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}