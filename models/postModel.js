const mongoose=require("mongoose")


const postSchema=new mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    device:{type:String,enum:["PC","TABLET","MOBILE"],required:true},
    creator:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    name:{type:String}
})
module.exports=mongoose.model("Post",postSchema)