const mongoose= require("mongoose");
const Schema= mongoose.Schema;
const passportlocalmongoose= require("passport-local-mongoose");
const userschema= new Schema({
    email:{
        type:String,
        required:true,
    },
    //the passport local can define the userr and passport by its own


});
//to go npmjs.com
userschema.plugin(passportlocalmongoose);//passportlocalmongoose

module.exports = mongoose.model('User', userschema);