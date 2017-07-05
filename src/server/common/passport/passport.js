/* eslint-disable no-underscore-dangle, dot-notation */

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import authDml from '../auth';
import config from '../../config';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (no, done) => {
  // findBy User
  try {
    const user = authDml.selectUserByNo({
      userNo: no,
    });

    done(null, user);
  } catch (e) {
    done(e, null);
  }
});

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = authDml.selectUserByEmail({
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
  const fooBar = async () => {
    try {
      if (req.user) { // 요청 정보에 유저에 대한 데이터가 존재하는 경우
        const userLogin = await authDml.selectFacebookLoginUser({
          cond: {
            id: profile.id,
          },
        });

        if (userLogin) {
          done(null, {
            id: userLogin.userNo,
            email: userLogin.userEmail,
          }); // catch 에서 받아서 처리
        } else {
          // 트랜잭션 처리가 필요할 수도 있겠다 싶음... 하나로 묶어서 다른방법으로 처리하는 걸 모색해 봐야됨..
          const insertNo = await authDml.upsertFacebookUser({
            no: req.user.id,
            email: profile._json.email,
            name: profile.displayName,
            picture: `https://graph.facebook.com/${profile.id}/picture?type=large`,
            facebook: profile.id,
            token: accessToken,
          });

          const user = await authDml.selectUserByNo({
            userNo: insertNo,
          });

          done(null, {
            id: user.userNo,
            email: user.userEmail,
          });
        }
      } else { // 요청정보에 유저에 대한 데이터가 없는경우 ..
        const userLogin = await authDml.selectFacebookLoginUser({
          cond: {
            id: profile.id,
          },
        });

        if (userLogin) { // 소셜로그인을 통해 로그인이된경우
          done(null, {
            id: userLogin.userNo,
            email: userLogin.userEmail,
          });
        } else {
          const insertNo = await authDml.upsertFacebookUser({
            email: profile._json.email,
            name: profile.displayName,
            picture: `https://graph.facebook.com/${profile.id}/picture?type=large`,
            token: accessToken,
            facebook: profile.id,
          });

          const user = await authDml.selectUserByNo({
            userNo: insertNo,
          });

          done(null, {
            id: user.userNo,
            email: user.userEmail,
          });
        }
      }
    } catch (err) {
      done(err);
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
  console.info(req.originalUrl);
  return res.redirect(`/login?returnTo=${req.originalUrl}`);
};

/**
 * Authorization Required middleware.
 */
const isAuthorized = (req, res, next) => {
  const provider = req.path.split('/').slice(-1)[0];
  const token = req.cookies['id_token'];
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
