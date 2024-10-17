const express=require("express");
const app=express();
const router=express.Router({mergeParams:true});
const wrapasync = require("../utils/wrapasync.js");
const ExpressError=require("../utils/ExpressError.js");
const review=require("../models/reviews.js");
const listing=require("../models/listing.js");
const {listingschema,reviewSchema}=require("../schema.js");
//review route post
const listingcontrollerreview =require("../controllers/review.js");



//listing schema which was seeted by useing the joi which can provide the sever side security 

//writing in a function

const validatereview=(req,res,next)=>{


    const {err}=reviewSchema.validate(req.body);//validating with the reviewschema

    
    if(err){
        let em=err.details.map((e)=>e.message).join(",");
        throw new ExpressError(400,em);
    }
    else{
        next();
    }
}//t
router.post("/",validatereview,wrapasync(listingcontrollerreview.createreview));
    //delete route
    router.delete("/listings/:id/reviews/reviewId",wrapasync(listingcontrollerreview.deletereview))

    
    module.exports=router;