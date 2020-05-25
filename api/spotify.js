/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const axios = require("axios").default;
const queryString = require("querystring");
const { URL, URLSearchParams } = require("url");

const router = express.Router();

function generateRandomString(length) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const stateKey = "spotify_auth_state";

router.get("/authorize", (req, res) => {
  console.log(req.connection.remoteAddress);
  const state = generateRandomString(16);
  const baseUrl =
    process.env.NODE_ENV === "production" ? req.host : "localhost:8080";
  const redirectUrl = req.protocol + "://" + baseUrl + "/api/spotify/callback";
  res.cookie(stateKey, state);

  const scope =
    "user-read-playback-state" +
    " user-modify-playback-state" +
    " user-read-private" +
    " streaming" +
    " user-read-email";
  const url = new URL("https://accounts.spotify.com/authorize");
  const params = {
    response_type: "code",
    scope: scope,
    client_id: clientId,
    redirect_uri: redirectUrl,
    state: state
  };
  url.search = new URLSearchParams(params).toString();
  res.redirect(url.href);
});

router.get("/callback", async (req, res) => {
  const baseUrl =
    process.env.NODE_ENV === "production" ? req.host : "localhost:8080";
  const redirectUrl = req.protocol + "://" + baseUrl + "/api/spotify/callback";

  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null && storedState !== state) {
    res.redirect(
      "/" +
        queryString.stringify({ query: req.query, storedState: storedState })
    );
  } else {
    res.clearCookie(stateKey);

    const url = "https://accounts.spotify.com/api/token";
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirectUrl,
        grant_type: "authorization_code"
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(clientId + ":" + clientSecret).toString("base64")
      },
      json: true
    };
    try {
      const { data } = await axios.post(
        url,
        queryString.stringify({
          code,
          redirect_uri: redirectUrl,
          grant_type: "authorization_code"
        }),
        {
          headers: {
            Authorization:
              "Basic " +
              new Buffer(clientId + ":" + clientSecret).toString("base64")
          }
        }
      );

      const results = {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_in: data.expires_in
      };

      return res.redirect("/connect?" + queryString.stringify(results));
    } catch (e) {
      return res.redirect("/#" + queryString.stringify({ error: e }));
    }
  }
});

module.exports = router;
