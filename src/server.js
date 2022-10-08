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
    name: "Zack",
    comments: "Pizza's are the best!",
    date: "19/12/2022",
  },
  {
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

// Handles form submission
server.post("/", bodyParser, (request, response) => {
  const name = request.body.username;
  const comments = request.body.opinion;

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
    const date = new Date().toLocaleDateString("en-GB");
    posts.unshift({ name, comments, date });
    response.redirect("/");
  }
});

// Missing Route Handler
server.use((request, response) => {
  response.status(404).send(`<h1>Route Not Found</h1>`);
});

module.exports = server;
