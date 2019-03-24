const axios = require("axios");
const passport = require("passport");
const PassportGithub = require("passport-github2");
const session = require("express-session");
const config = require("../config");
const headers = {
  "Content-Type": "application/json",
  ...config.kijimuna.auth
};

const applyStrategy = function(options, origin) {
  passport.use(
    new PassportGithub.Strategy(
      {
        clientID: options.client,
        clientSecret: options.secret,
        callbackURL: `${origin}/auth/github/callback`
      },
      (accessToken, refreshToken, profile, cb) => {
        Promise.all([
          axios({
            method: "post",
            url: `${config.kijimuna.url}/api/users`,
            headers,
            data: {
              id: profile.username,
              icon: profile._json.avatar_url
            }
          }).then(res => res.data, res => res.response.data),
          axios(
            `https://api.github.com/user/orgs?access_token=${accessToken}`
          ).then(res => res.data, res => res.response.data)
        ])
          .then(([user, items]) =>
            Promise.all(
              items.map(item =>
                axios({
                  method: "post",
                  url: `${config.kijimuna.url}/api/groups`,
                  headers,
                  data: {
                    id: item.login,
                    icon: item.avatar_url
                  }
                }).then(() =>
                  axios({
                    method: "post",
                    url: `${
                      config.kijimuna.url
                    }/api/groups/${encodeURIComponent(item.login)}/attendees`,
                    headers,
                    data: {
                      user: profile.username
                    }
                  })
                )
              )
            )
          )
          .then(() => cb(null, { ...profile, token: accessToken }));
      }
    )
  );
};

const applyEndpoint = function(app) {
  app.get(
    `/auth/github`,
    passport.authenticate("github", {
      session: true,
      scope: ["read:user", "read:org"]
    })
  );

  app.get(
    `/auth/github/callback`,
    passport.authenticate("github", {
      session: true,
      failureRedirect: `/auth/github`
    }),
    function(req, res) {
      const redirect = req.cookies.redirect || "/";
      res.clearCookie("redirect");
      res.redirect(redirect);
    }
  );
};

module.exports = function(app, options, origin) {
  app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false
    })
  );

  // passport setup Strategy
  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });

  applyStrategy(options, origin);

  app.use(passport.initialize());
  app.use(passport.session());

  // Endpoint to confirm authentication is still in valid
  app.get("/auth", function(req, res, next) {
    if (req.isAuthenticated()) {
      console.log(req.user);
      res.status(200).json({
        id: req.user.id,
        name: req.user.username
      });
      return;
    }
    res.status(401).json({});
  });

  applyEndpoint(app);
};
