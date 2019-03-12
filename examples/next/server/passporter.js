const fetch = require("isomorphic-unfetch");
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
          fetch(`${config.kijimuna.url}/api/users`, {
            method: "POST",
            headers,
            body: JSON.stringify({
              id: profile.username,
              icon: profile._json.avatar_url
            })
          }),
          fetch(profile._json.organizations_url).then(res => res.json())
        ])
          .then(([user, items]) =>
            Promise.all(
              items.map(item =>
                fetch(`${config.kijimuna.url}/api/groups`, {
                  method: "POST",
                  headers,
                  body: JSON.stringify({
                    id: item.login,
                    icon: item.avatar_url
                  })
                }).then(() =>
                  fetch(
                    `${config.kijimuna.url}/api/groups/${encodeURIComponent(
                      item.login
                    )}/attendees`,
                    {
                      method: "POST",
                      headers,
                      body: JSON.stringify({
                        user: profile.username
                      })
                    }
                  )
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
  app.get(`/auth/github`, passport.authenticate("github", { session: true }));

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
  app.get(
    "/auth",
    function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      return res.status(401).json({});
    },
    function(req, res) {
      res.status(200).json({
        id: req.user.id,
        name: req.user.username
      });
    }
  );

  applyEndpoint(app);
};
