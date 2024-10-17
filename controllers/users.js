const user=require("../models/user.js")
module.exports.signupform= (req,res)=>{
    res.render("users/login.ejs");
  }
module.exports.signup=async(req,res,next)=>{
    try{
      let{username,email,password}= req.body;
      let newuser= new User({username,email});
      const register= await User.register(newuser,password);
       console.log(register);
       req.login(register,(err)=>{
        if(err){
        return next(err);
       }
       req.flash("sucess","welcome to wonderlust");
       res.redirect("/listings");
  });
  
  }  
  catch(err){
  req.flash("error",err.message);
  res.redirect("/signup");
  }}