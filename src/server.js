// Imports Express
const express = require("express");

// Create Server
const server = express();

// Import Templates
const { content } = require("./template.js");

// Import Styles
const staticHandler = express.static("styles");

//
const bodyParser = express.urlencoded();

// Dummy Data
const posts = [
  {
    id: 1,
    name: "Zack",
    comments: "Pizza's are the best!",
    date: "19/12/2022",
  },
  {
    id: 2,
    name: "Anna",
    comments: "Donuts are yummy!",
    date: "22/12/2022",
  },
];

// Server Handler
server.use(staticHandler);

// Route Handlers
server.get("/", (request, response) => {
  let emptyFormValues = {
    name: "",
    comments: "",
  };
  const body = content(posts, {}, emptyFormValues);

  response.send(body);
});

// Delete Post
server.post("/delete/:id", bodyParser, (req, res) => {
  const id = parseInt(req.params.id);

  // Delete Array Function
  const removeByAttr = function (arr, attr, value) {
    let i = posts.length;
    while (i--) {
      if (
        posts[i] &&
        posts[i].hasOwnProperty(attr) &&
        arguments.length > 2 &&
        posts[i][attr] === value
      ) {
        posts.splice(i, 1);
      }
    }
    return posts;
  };

  // Removes Object in Posts
  posts.map((post) => {
    if (post.id === id) {
      removeByAttr(posts, "id", id);
    }

    // console.log(id, post.id);
  });
  res.redirect("/");
});

// Handles form submission
server.post("/", bodyParser, (request, response) => {
  const name = request.body.username;
  const comments = request.body.opinion;
  const date = new Date().toLocaleDateString("en-GB");

  let formValues = { name, comments };

  let errors = {};

  if (name === "") {
    errors.name = "Please enter your name.";
  }

  if (comments === "") {
    errors.comments = "Please enter a comment.";
  }

  if (Object.keys(errors).length) {
    response.status(400).send(content(posts, errors, formValues));
  } else {
    posts.push({
      id: posts.length === 0 ? 1 : posts[posts.length - 1].id + 1,
      name,
      comments,
      date,
    });

    response.redirect("/");
  }
});

// Missing Route Handler
server.use((request, response) => {
  response.status(404).send(`<h1>Route Not Found</h1>`);
});

module.exports = server;
