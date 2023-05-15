import express from 'express';
import mongoose from "mongoose";
import _ from "lodash";

const app = express();
const port = 3000;

function truncate(input) {
  const threshold = 80;
  if (input.length > threshold) {
    return input.substring(0, threshold) + ' ...';
  }
  return input;
};


app.set("view engine", "ejs");
// Don't exactly know why I have to manually set the views folder but otherwise it will look
// in parent directory
app.set("views", "./views");
app.use(express.static('./public'));


app.use(express.urlencoded({
  extended: true
})); // Necessary to tap into data recieved via html form
app.use(express.static("public")); // Upload static files in public folder!

mongoose.connect(`mongodb+srv://${process.env.ADMIN_ACCOUNT}:${process.env.ADMIN_PASSWORD}@daisyduke.iusbkik.mongodb.net/blogPostsDB`);

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";

const postsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  truncatedBody: String,
});

const Post = new mongoose.model("Post", postsSchema);

const post1Body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const post1 = new Post({
  title: "Day 1",
  body: post1Body,
  truncatedBody: truncate(post1Body)
});

const post2Body = "Feugiat scelerisque varius morbi enim. Rhoncus aenean vel elit scelerisque. Ut tortor pretium viverra suspendisse potenti. Non blandit massa enim nec. Eget dolor morbi non arcu. Tincidunt praesent semper feugiat nibh sed pulvinar. Est ante in nibh mauris cursus. Neque laoreet suspendisse interdum consectetur libero id faucibus. Tristique senectus et netus et malesuada fames ac turpis. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Est placerat in egestas erat imperdiet sed. Libero nunc consequat interdum varius sit amet mattis. Orci nulla pellentesque dignissim enim sit amet.";
const post2 = new Post({
  title: "Day 2",
  body: post1Body,
  truncatedBody: truncate(post2Body)
});

app.get("/", async (req, res) => {
  
  const posts = await Post.find().catch((error) => {
    console.log(error)
  });

  res.render("home", {
    startingText: homeStartingContent,
    posts: posts,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    aboutText: aboutContent
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    contactText: contactContent
  });
});

app.get("/compose", (req, res) => {
  res.render("compose", {});
});

app.post("/compose", (req, res) => {
  const newPost = new Post({
    title: req.body.postTitle,
    body: req.body.postBody,
    truncatedBody: truncate(req.body.postBody)
  });
  newPost.save();
  res.redirect("/");
});

app.get("/posts/:post", async (req, res) => {
  
  const posts = await Post.find().catch((error) => {
    console.log(error)
  });
  
  const requestedPost = req.params.post;
  for (post of posts) {
    if (requestedPost === post._id.valueOf()) {
      res.render("post", {
        title: post.title,
        content: post.body
      })
    };
  };
});


app.listen(3000, function () {
  console.log("Server started on port 3000");
});