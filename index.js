const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");

const app = express();
app.use(express.json());
const connection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Rohit2002:20022003@cluster0.riuail2.mongodb.net/nemc4?retryWrites=true&w=majority"
    );
    console.log("Connected to Mongoose");
  } catch (err) {
    console.log(err);
  }
};


app.get("/",(req,res)=>{
    res.send("Welcome to Home Page")
})

app.use("/users",userRouter)
app.use("/posts",postRouter)
app.listen(8080,async()=>{
    connection()
    console.log("Listening on port 8080")
})