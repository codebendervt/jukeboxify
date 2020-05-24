/* eslint-disable @typescript-eslint/no-var-requires */
const router = require("./api/router");
const withSockets = require("./api/ws/withsockets");

// prettier-ignore
module.exports = (application) => {
  const app = withSockets(application)
  app.use("/api", router);
};
