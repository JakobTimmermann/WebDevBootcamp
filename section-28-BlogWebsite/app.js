const express = require("express");
var _ = require('lodash');
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
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + '/public'));


app.use(express.urlencoded()); // Necessary to tap into data recieved via html form
app.use(express.static("public")); // Upload static files in public folder!

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const posts = [];

app.get("/", (req, res) => {
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
  const post = {
    title: req.body.postTitle,
    body: req.body.postBody,
    truncatedBody: truncate(req.body.postBody),
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:post", (req, res) => {
  const requestedPost = _.lowerCase(req.params.post);
  for (post of posts) {
    if (requestedPost === _.lowerCase(post.title)) {
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