/* eslint-disable no-underscore-dangle */

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import authDml from '../auth';
import config from '../../config';

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (no, done) => {
  // findBy User
  try {
    const user = authDml.deserializeUser({
      mbrNb: no,
    });

    done(null, user);
  } catch (e) {
    done(e, null);
  }
});

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = authDml.selectUser({
      userEmail: email,
    });
    //
    if (!user) {
      return done(new Error('이메일이나 패스워드가 잘못되었습니다.'), null);
    }

    let result = null;
    if (user.password === password) {
      result = done(null, user);
    } else {
      result = done(new Error('이메일이나 패스워드가 잘못되었습니다.'), null);
    }

    return result;
  } catch (e) {
    return done(e);
  }
}));

passport.use(new FacebookStrategy({
  clientID: config.auth.facebook.id,
  clientSecret: config.auth.facebook.secret,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['displayName', 'name', 'email', 'link', 'locale', 'timezone'],
  passReqToCallback: true,
}, (req, accessToken, refreshToken, profile, done) => {
  const loginName = 'facebook';
  console.info('accessToken');
  console.info(accessToken);
  const fooBar = async () => {
    if (req.user) { // 요청 정보에 유저에 대한 데이터가 존재하는 경우
      const userLogin = await authDml.selectFacebookLoginUser({
        vender: loginName,
        id: profile.id,
      });

      if (userLogin) {
        done();
      } else {
        const insertId = await authDml.insertFacebookUser({
          email: profile._json.email,
          name: profile.displayName,
          picture: `https://graph.facebook.com/${profile.id}/picture?type=large`,
          authStr: profile.id,
          token: accessToken,
        });

        const user = await authDml.deserializeUser({
          mbrNb: insertId,
        });

        done(null, {
          id: user.mbrNb,
          email: user.mbrEmail,
        });
      }
    } else { // 요청정보에 유저에 대한 데이터가 없는경우 ..
      const userLogin = await authDml.selectFacebookLoginUser({
        vender: loginName,
        id: profile.id,
      });
      console.info('passport87');
      console.info(userLogin);
      if (userLogin) { // 소셜로그인을 통해 로그인이된경우
        done(null, {
          id: userLogin.mbrNb,
          email: userLogin.mbrEmail,
        });
      } else {
        const insertId = await authDml.insertFacebookUser({
          email: profile._json.email,
          name: profile.displayName,
          picture: `https://graph.facebook.com/${profile.id}/picture?type=large`,
          token: accessToken,
          authStr: profile.id,
        });

        const user = await authDml.deserializeUser({
          mbrNb: insertId,
        });

        done(null, {
          id: user.mbrNb,
          email: user.mbrEmail,
        });
      }
    }
  };

  fooBar().catch(done);
}));

/**
 * Login Required middleware.
 */
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/login');
};

/**
 * Authorization Required middleware.
 */
const isAuthorized = (req, res, next) => {
  const provider = req.path.split('/').slice(-1)[0];
  const token = req.user.tokens.find(t => t.kind === provider);
  if (token) {
    next();
  } else {
    res.redirect(`/auth/${provider}`);
  }
};

export default {
  isAuthenticated,
  isAuthorized,
};
