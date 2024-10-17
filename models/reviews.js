let mongoose= require("mongoose");
let reviewschema= mongoose.Schema;
let review= new reviewschema({
   comment:String,
   rating:{
    type:Number,
    min:1,
    max:5
   },
   createdAt:{
    type:Date,
    default:Date.now,
   }
});
module.exports=mongoose.model("Review",review);


