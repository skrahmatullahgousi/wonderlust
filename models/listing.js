let mongoose=require("mongoose");
const Schema=mongoose.Schema;
let listingschema= new Schema({
    title:{type:String,
            required:[true,'Title is required']},

    description:{
        type:String,
    },
    image: {
      filename: { type: String, default: "" },
      url: { type: String, default: "https://plus.unsplash.com/premium_photo-1723291846204-4aa828a8b08a?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8" }
    }
    ,

    price:Number,
    location:String,
    country:String,
    reviews:[
      {
        type: Schema.Types.ObjectId,
            ref: "Review"
        //refer to model
      }
    ]
})
let listing =mongoose.model("listing",listingschema);
module.exports=listing;
