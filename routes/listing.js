const express=require("express");
const app=express();
const router=express.Router();
const wrapasync = require("../utils/wrapasync.js");

const listing=require("../models/listing.js");
const ExpressError=require("../utils/ExpressError.js");
const methodeoverride=require("method-override");
const {listingschema}=require("../schema.js");
const {isloggedin}= require("../middleware.js");
//listing schema which was seeted by useing the joi which can provide the sever side security 
//writing in a function
const validatelisting=(req,res,next)=>{


    let {err}=listingschema.validate(req.body);

    
    if(err){
        let em=err.details.map((e)=>e.message).join(",");
        throw new ExpressError(400,em);
    }
    else{
        next();
    }
}

const multer  = require('multer');
const storage=require("../cloudConfig.js");

const upload = multer({ storage }); 



//listing controller
const listingcontroller= require("../controllers/listings.js");


//home route
router.get("/home",isloggedin,(req,res)=>{
  
    res.redirect("/listings");
});
/*app.get("/tests",async (req,res)=>{
    const news=  new listing({
        title:"my new villa",
        description:"by the beach",
        price:120558,
        location:"konfrong",
        country:"india"

});
await news.save();
console.log("sucessful");
res.send("suessful testing");
//try once more
});*/

router.route("/")

.get( wrapasync(listingcontroller.index))
       //this home route ok
.post( upload.single('listing[image]'), (req, res)=>{   
    res.send(req.file)});
//new route
router.get("/new",isloggedin,listingcontroller.renderfrom);



//create route

    //isloggedin,validatelisting,wrapasync(listingcontroller.cratelisting
   /*
    if(!req.body.listing){
        throw new ExpressError(400,"please send the valid request");
    }
 const newlisting=new listing(req.body.listing);
 if(!newlisting.title){
    throw new ExpressError(404,"the titke is not defined");
 }
  if(!newlisting.description){
    throw new ExpressError(404,"the description is not defined");
 }

 if(!newlisting.location){
    throw new ExpressError(404,"the location  is not defined");
 }


 */





//editroute
router.get("/:id/edit",isloggedin,wrapasync (listingcontroller.editfrom)); 


//update route
router.put("/:id",isloggedin,validatelisting, wrapasync(listingcontroller.update));


//delete route

router.delete("/:id",isloggedin,wrapasync (listingcontroller.delete));
//show route
router.get("/:id",wrapasync(listingcontroller.showlisting)); 
module.exports=router;

