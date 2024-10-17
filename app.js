require("dotenv").config();
console.log(process.env.Sceret);
if(process.env.NODE_ENV!="production"){
require("dotenv").config();
}


console.log(process.env.SECRET);

const express=require("express");
const mongoose=require("mongoose");
const path=require("path");
const app =express();
const methodeoverride=require("method-override");
const listing=require("./models/listing.js");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(methodeoverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"/public")));
const routerlistings=require("./routes/listing.js")
 
const port=8000;
let ejsmate=require("ejs-mate");
const passport=require("passport");
const localStraetegy=require("passport-local");
const User= require("./models/user.js");
const wrapasync = require("./utils/wrapasync.js");
const ExpressError=require("./utils/ExpressError.js");
app.engine("ejs",ejsmate);

const reviewrouter= require("./routes/review.js");
const userrouter =require("./routes/user.js");
//const store=MongoStore.create({

//})
const expresssession=require("express-session");
const MongoStore = require('connect-mongo');

const expressobject=({secret:"secrectmessage",resave:false,saveUninitialized:true,
    cookie:
    {expires:Date.now()+ 10*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true}
});


//const store=MongoStore.create({mongoUrl})  
app.use(expresssession(expressobject));
 

const flash =require("connect-flash");
app.use(flash());





//intilizing passport middleware go to document
app.use(passport.initialize());//to use middleware
app.use(passport.session());//to set passport session
passport.use(new localStraetegy(User.authenticate())); //here user is the use rmodel we required it
passport.serializeUser(User.serializeUser());// from passport -loccal-mongoose
passport.deserializeUser(User.deserializeUser());// from passport -loccal-mongoose
app.use((req,res,next)=>{
    res.locals.sucess=req.flash("sucess");
    res.locals.error=req.flash("error");
    res.locals.currentuser=req.user;
    next();
});

/*
//Demo use
app.get("/demouser",async(req,res)=>{
    let fakeruser= new User({
        email:"shaikrahmath@gmail.com",
        username:"shaik rahmatullah"
    });
   let saveduser= await User.register(fakeruser,"helloworld");
   res.send(saveduser);
})*/

app.use("/listings",routerlistings);
app.use("/listings/:id/reviews",reviewrouter);
app.use("/",userrouter);

app.listen(port,()=>{

    console.log("hello");
});
main().then(()=>{
    console.log("it is doing grate");
}).catch((err)=>{
    console.log(err);
})
async function main(){
    mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}










// for the message for the not finding the page
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"this page is not founded"));
});
app.use((err, req, res, next) => {
    let{statusCode=500,message="this will going to some other issue"}=err;
    //res.status(statusCode).send(message);
   res.status(statusCode).render("listings/error.ejs",{err});
});


/*to validate schema we use joy it is npm package  
npm i joy  for the sever side validation we will able define the  joy schema 
*/