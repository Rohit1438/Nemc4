const { Router } = require("express");
const User = require("../models/userModel");
const Post = require("../models/postModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { auth } = require("../middleware/auth");
const postRouter = Router();

postRouter.get("/", auth, async (req, res) => {
  console.log("coming in postroute");
  try {
    const posts = await Post.find({});
    await res.status(200).json(posts);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

postRouter.post("/add", auth, async (req, res) => {
  try {
    const { title, body, device } = req.body;
    const post = await new Post({
      title,
      body,
      device,
      creator: req.userId,
      name: req.username,
    });

    console.log(req.userId, "post");
    await post.save();
    await post.populate("creator");
    res.status(200).send(post);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

postRouter.patch("/update/:postId", auth, async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post) {
      res.status(404).send("POst Not Found");
    }

    if (post.creator && post.creator.toString() !== req.userId) {
      return res.status(403).json({ message: "Operation Not Allowed" });
    }
    const updatedPOst = await Post.findByIdAndUpdate(postId, req.body, {
      new: true,
    });

    res.status(200).json({ message: "Post Updated", post: updatedPOst });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

postRouter.delete("/delete/:postId", auth, async (req, res) => {
    try {
      const postId = req.params.postId;
      const post = await Post.findById(postId);
  
      if (!post) {
        res.status(404).send("POst Not Found");
      }
  console.log(post)
      if (post.creator && post.creator.toString() !== req.userId) {
        return res.status(403).json({ message: "Operation Not Allowed" });
      }
      const updatedPOst = await Post.findByIdAndDelete({_id:postId});
  
      res.status(200).json({ message: "Post Deleted", post: updatedPOst });
    } catch (err) {
      res.status(400).send(err.message);
    }
  });

module.exports = postRouter;
