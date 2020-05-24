/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
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
const redirectUrl = "http://localhost:8080/api/spotify/callback";

router.get("/authorize", (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  const scope =
    "user-read-playback-state" +
    " user-modify-playback-state" +
    " user-read-private";
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

    const request = require("request");
    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token,
          refresh_token = body.refresh_token;

        const options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          "/#" +
            queryString.stringify({
              access_token: access_token,
              refresh_token: refresh_token
            })
        );
      } else {
        res.redirect(
          "/#" +
            queryString.stringify({
              error: "invalid_token"
            })
        );
      }
    });
  }
});

module.exports = router;
