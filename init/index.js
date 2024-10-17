let mongoose=require("mongoose");
let initdata=require("./data.js");
let listing=require("../models/listing.js");
main().then(()=>{
    console.log("it is doing grate");
}).catch((err)=>{
    console.log(err);
})
async function main(){
    mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}
const initdb= async ()=>{
    await listing.deleteMany({});
    await  listing.insertMany(initdata.data);
    console.log("data was inilizes");
}
initdb();