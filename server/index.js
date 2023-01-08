// require
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// make instance of express
const app = express();

// use middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// listen to server
const port = 8000;
app.listen(port || 8000, () => {
  console.log("server is running");
  console.log("on port " + port);
});

const animal = [{ animal: "horse" }];
// routes
app.post("/post", (req, res) => {
  animal.push(req.body);
  console.log(animal);
});
app.get("/get", (req, res) => {
  res.send(animal);
});
