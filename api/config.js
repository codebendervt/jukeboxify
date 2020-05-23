/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const date = require("./date");

const router = express.Router();

router.get("/date", date);

// prettier-ignore
module.exports = (app) => {
  app.use(express.json());
  app.use("/api", router);
};
