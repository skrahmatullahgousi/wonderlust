const listing=require("../models/listing");
const review =require("../models/reviews");




module.exports.createreview=async(req,res)=>{
    let listings= await listing.findById(req.params.id).populate("reviews");//populte used print the whole data
    let newReview =new review(req.body.review);
    
    listings.reviews.push(newReview);
    await newReview.save();
    await listings.save();
    console.log("sucess");
    
    res.redirect(`/listings/${listings.id}`);    
    
    }


    module.exports.deletereview=async(req,res,next)=>{
        let {id,reviewId}= req.params;

        //to delete the rviewsid in the reviewsaarray by useing the pull operater;
     await review.findByIdAndUpdate(id,{$pull:{review:reviewId}});
     await review.findByIdAndDelete(reviewId);
     res.redirect(`/listings/${id}`);
}