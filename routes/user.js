const express= require("express");
const router=express.Router();
const User= require("../models/user.js");
const wrapasync= require("../utils/wrapasync");
const passport= require("passport");
const {saveRedirectUrl}=require("../middleware.js");
const usercontroller= require("../controllers/users.js")
router.get("/signup",(req,res)=>{ 
  res.render("users/signup.ejs");  
});
router.post("/signup",wrapasync(usercontroller.signup));


router.get("/login",usercontroller.signupform);


//login
router.post(
  "/login",
  saveRedirectUrl, // Check this middleware
  passport.authenticate("local", { // Check this middleware
      failureRedirect: "/login",
      failureFlash: true
  }),
  async (req, res) => { // Ensure this callback is defined
      req.flash("success", "Hai! welcome to wanderlust! You are logged in!");
      res.redirect(res.locals.redirectUrl || '/');
  }
); // Ensure this is closed properly


router.get("/logout",(req,res,next)=>{
  req.logout((err)=>{
    if(err){
  return  next(err);
    }
  });
  
  req.flash("sucess","you are logged out scuessfully");
    res.redirect("/listings");
});

module.exports=router;