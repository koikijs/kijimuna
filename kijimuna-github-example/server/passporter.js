const passport = require("passport");
const PassportGithub = require("passport-github2");
const session = require("express-session");

const applyStrategy = function(config, origin) {
  passport.use(
    new PassportGithub.Strategy(
      {
        clientID: config.client,
        clientSecret: config.secret,
        callbackURL: `${origin}/auth/github/callback`
      },
      (accessToken, refreshToken, profile, cb) =>
        cb(null, { ...profile, token: accessToken })
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

module.exports = function(app, config, origin) {
  app.use(
    session({
      secret: "keyboard cat",
      resave: true,
      saveUninitialized: true
    })
  );

  // passport setup Strategy
  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });

  applyStrategy(config, origin);

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
