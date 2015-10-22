"use strict"

const path = require("path");

global.include = name => require(path.join(__dirname, name));

const request = include("api-log");
const url = require("url");
const fs = require("fs");

const BASE_API = "https://api.intrav2.42.fr/"
const API_CODE = "4cca9bbd191242097e95c9f8c8c800987f2a0801dbf76e6b39b373dfee01d228"

function api42(urlPath) {
  return new Promise((resolve, reject) => {
    request(urlPath, (error, response, body) => {
console.log("wesh", JSON.stringify({error, response, body}), null, 2);
//      if (error) return reject(error);
//      try {
//	resolve(JSON.parse(body))
 //     } catch (err) { reject({err, response}); }
    })
  })
}



//api42("v2/campus/").then(json => console.log("json", json))
//.catch(err => {
//  console.log("err", JSON.stringify(err, null, 2))
//})
//

request("/v2/campus/1/events").then(console.log)


