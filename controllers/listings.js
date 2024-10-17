let listing= require("../models/listing")
module.exports.index=async (req,res)=>{
    const listings= await listing.find({});
       res.render("listings/index.ejs",{listings});
     }

module.exports.renderfrom=(req,res)=>{
  
        //checking the athentification 
      
          res.render("listings/new.ejs");
      }



module.exports.showlisting=async (req,res)=>{
        let{id}=req.params;
      const data= await listing.findById(id).populate("reviews");
      if(!data){
        req.flash("error","the listing you requested doesn't exist");
       return  res.redirect("/listings");
      }
      
      res.render("listings/show.ejs",{data});
    
       
    }
    module.exports.cratelisting=async(req,res,next)=>{

    const newlisting = new listing(req.body.listing);
    //newlisting.owner=req.user;
    console.log(req.user);
    await newlisting.save();
    req.flash("sucess","A new route is crated");
   res.redirect("/listings");
   
   }
   module.exports.editfrom=async (req,res)=>{
    let{id}=req.params;
  const data= await listing.findById(id);
  if(!data){
    req.flash("error","the listing you requested doesn't exist");
    res.redirect("/listings");
  }
 // let originalImageUrl=listing.image.url;
  // originalImageUrl=originalImageUrl.replace("/upload","/upload/h_250,w_250");
  console.log(data);
  res.render("listings/edit.ejs",{data});

}
 

module.exports.update=async (req,res)=>{

    let {id}=req.params;
    await listing.findByIdAndUpdate(id,{...req.body.listing})
    req.flash("sucess","A n route is updated");

     res.redirect("/listings");
}

module.exports.delete=async (req,res)=>{
    let {id}=req.params;
  let deleted= await listing.findByIdAndDelete(id);
  if(!deleted){
    req.flash("error","the listing you requested doesn't exist");
    res.redirect("/listings");
  }
  req.flash("sucess","A new route is deleted");
  res.redirect("/listings");  
    
}