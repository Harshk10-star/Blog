//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Journaling is a practice of regularly writing down one's thoughts, feelings, and experiences in a journal or diary. It can be a therapeutic and reflective activity that can help individuals gain insight into their emotions, behaviors, and patterns of thinking. Journaling can also be a way to document events, memories, and personal growth. Many people find that journaling helps them process and make sense of their thoughts and feelings, and can even have a positive impact on their mental and emotional well-being.";
const aboutContent = "Journaling is a powerful and personal practice that allows individuals to reflect on their thoughts, feelings, and experiences. By regularly recording one's thoughts and emotions in a journal or diary, people can gain insight into their patterns of thinking and behavior, and can better understand and make sense of their emotions. Journaling can also be a way to document and track personal growth, and can serve as a creative outlet and a source of self-discovery.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/blogDB');



const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);


app.get("/",function(req,res){
  Post.find({}, function(err, posts){
    res.render("home", {
      content: homeStartingContent,
      posts: posts
      });
  });
});



app.get("/about",function(req,res){
  res.render("about",{content:aboutContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",function(req,res){
  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save();

  res.redirect("/");
});



app.get("/posts/:postId",function(req,res){

  const requestedPostId = req.params.postId;
  Post.findOne({_id: requestedPostId}, function(err, post){

    res.render("post", {
 
      title: post.title,
 
      content: post.content
 
    });
 
  });
 
 
  
});








app.listen(3000, function() {
  console.log("Server started on port 3000");
});
