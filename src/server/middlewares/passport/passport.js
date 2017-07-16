import passport from 'passport';

import local from './local';
import facebook from './facebook';
import google from './google';
import kakao from './kakao';
import userDml from '../../database/models/userInfo/userInfo.dml';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (no, done) => {
  // findBy User
  try {
    const user = userDml.selectUserByNo({
      cond: {
        userNo: no,
      }
    });

    done(null, user);
  } catch (e) {
    done(e, null);
  }
});


passport.use(local);
passport.use(facebook);
passport.use(google);
passport.use(kakao);


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
  const token = req.cookies['id_token']; // eslint-disable-line dot-notation
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
