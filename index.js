"use strict"

const path = require("path");

global.include = name => require(path.join(__dirname, name));

const api42 = include("api42");
const url = require("url");
const fs = require("fs");

// api42.getAll("locations", {
//   active: true,
// }).then(data => {
//   console.log(data.length);
// });

// api42.getAll("campus/1/events", {
//   // active: true,
// }).then(data => {
//   console.log(data.length);
// });


// start the server
include("server");




