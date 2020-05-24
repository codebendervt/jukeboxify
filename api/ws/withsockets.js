/* eslint-disable @typescript-eslint/no-var-requires */
const url = require("url");
const queryString = require("querystring");
const admin = require("firebase-admin");

const stringConfig = Buffer.from(
  process.env.FIREBASE_CONFIG_BASE64,
  "base64"
).toString("ascii");

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(stringConfig))
});
const expressWs = require("express-ws");
const session = require("./session");

module.exports = application => {
  const app = expressWs(application, null, {
    wsOptions: {
      verifyClient: async ({ req }, done) => {
        try {
          const requestUrl = url.parse(req.url);
          const { token } = queryString.parse(requestUrl.query);
          if (!token) done(false, 401, "Unauthorized");
          const decodedToken = await admin.auth().verifyIdToken(token);
          req.token = decodedToken;
          done(decodedToken);
        } catch (e) {
          console.error(e);
          done(false);
        }
      }
    }
  }).app;
  app.ws("/ws/session", session);
  return app;
};
