/* eslint-disable @typescript-eslint/no-var-requires */
const admin = require("firebase-admin");

const stringConfig = Buffer.from(
  process.env.FIREBASE_CONFIG_BASE64,
  "base64"
).toString("ascii");

const config = JSON.parse(stringConfig);

admin.initializeApp({ credential: admin.credential.cert(config) });

module.exports = admin;
