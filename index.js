require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { fetchPhone } = require("./SeleniumTest/fetchPhone");
const Phone = require("./Models/phone.Model");

mongoose.connect("mongodb://127.0.0.1:27017").then(() => {
  console.log("connected to the DataBase");
});

// two middleware helps in parsing
// the incoming request in the json formats and the form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// get route for the default.
app.get("/", async (req, res) => {
  // scrapes the data when hitting the get request for the home page
  await fetchPhone();
  res.json({
    msg: "Welcome",
    options: {
      1: "navigate to the /phone to get the list of phone",
    },
  });
});

app.get("/phone", async (req, res) => {
  // scrapes the data when hitting the get request for the home page
  const data = await Phone.find();
  await res.json({
    data,
  });
});

// setting up the server to listen.
// the port number is 5001
app.listen(process.env.PORT, () => {
  console.log(`Listening to the port: ${process.env.PORT}`);
});
