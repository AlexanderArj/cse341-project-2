const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const cors = require('cors');
const mongodb = require('./db/connect');
const usersModel = require('./models/users');

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
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await usersModel.findByGithubId(profile.id);

        if (!user) {
          const newUser = {
            githubId: profile.id,
            username: profile.username,
            displayName: profile.displayName,
            profileUrl: profile.profileUrl,
            avatarUrl: profile.photos?.[0]?.value || null,
            createdAt: new Date(),
            lastLogin: new Date()
          };

          await usersModel.createUser(newUser);
          user = await usersModel.findByGithubId(profile.id);
        } else {
          await usersModel.updateLastLogin(profile.id);
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user.githubId);
});

passport.deserializeUser(async (githubId, done) => {

  try {

    const user = await usersModel.findByGithubId(githubId);

    done(null, user);

  } catch (error) {

    done(error, null);

  }

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