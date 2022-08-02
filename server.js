const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const server = express();
const port = process.env.PORT || 8080;

//middleware setups
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static("website"));
server.use(cors());

//get call;
projectData = {};

server.get("/getData", (req, res) => {
  res.send(projectData);
});

//post call
server.post("/addData", (req, res) => {
  const data = req.body;
  projectData["temp"] = data.temp;
  projectData["date"] = data.date;
  projectData["feel"] = data.feel;
  projectData["city"] = data.city;
  projectData["icon"] = data.icon;
  projectData["country"] = data.country;
});
//get all
server.get("/all", (req, res) => {
  res.send(projectData);
  console.log(projectData);
});

server.listen(port, () => console.log("serving weather journal"));
