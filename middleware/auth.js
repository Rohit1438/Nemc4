const jwt=require("jsonwebtoken")
const auth=(req,res,next)=>{

    try{


const token=req.headers.authorization?.split(" ")[1]
console.log(token)
if(!token){
    res.json({message:"PLease Login,Token not provided"})
}else{
    const decoded=jwt.verify(token,"secretkey")
    req.userId=decoded.userId
    req.username=decoded.username

if(!decoded){
    res.status(200).json({message:"not authorized"})
}

next()
}


    }catch(err){
        console.log(err)
    }
}

module.exports={auth}