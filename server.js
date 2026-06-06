const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const cors = require('cors');
const mongodb = require('./db/connect');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;


app.use(express.json());

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());


passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});


app.get(
  '/auth/github',
  passport.authenticate('github', {
    scope: ['user:email']
  })
);

app.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/api-docs'
  }),
  (req, res) => {
    res.redirect('/');
  }
);

app.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.session.destroy(() => {
      res.redirect('/');
    });
  });
});


app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    return res.send(`Logged in as ${req.user.displayName}`);
  }

  res.send('Logged Out');
});

app.use('/', require('./routes'));


process.on('uncaughtException', (err, origin) => {
  console.error(`Caught exception: ${err}`);
  console.error(`Exception origin: ${origin}`);
});


mongodb.initDb((err) => {
  if (err) {
    console.error(err);
    return;
  }

  app.listen(port, () => {
    console.log(`Connected to DB and listening on port ${port}`);
  });
});