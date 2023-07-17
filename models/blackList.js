const mongoose=require("mongoose")


const blackListSchema=new mongoose.Schema({
blackList:{type:[String]}
})
module.exports=mongoose.model("blacklist",blackListSchema)