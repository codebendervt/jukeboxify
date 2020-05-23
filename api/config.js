/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const ExpressWs = require("express-ws");

const date = require("./date");
const session = require("./session");

const router = express.Router();

router.get("/date", date);

// prettier-ignore
module.exports = (application) => {
  const expressWs = ExpressWs(application);
  const app = expressWs.app;
  app.use("/api", router);
  app.ws("/ws/session", session);
};
