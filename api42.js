"use strict";

const path = require("path");
const baseRequest = include("api-log")(include('config').credentials);

const callApi = urlPath => baseRequest(path.join("/v2", urlPath));

function getAllPagesRecur(apiPath, n, resolve, reject) {
  let cumulatedData = [];
  callApi("locations?active=true&page="+ n)
    .then(data => {
      if (!data || data.length < 30) {
        resolve(cumulatedData.concat(data));
      } else {
        cumulatedData = cumulatedData.concat(data);
        getAllPagesRecur(apiPath, n + 1, resolve, reject);
      }
    }).catch(reject);
}

const getAllPages = apiPath => new Promise((resolve, reject) =>
  getAllPagesRecur(apiPath, 0, resolve, reject));

module.exports = {
  getAll: getAllPages,
  get: callApi,
};
