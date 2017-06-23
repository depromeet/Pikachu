import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import connection from '../database/connection';

passport.serializeUser((user, done) => {
  done(null, user.mbrNb);
});

passport.deserializeUser(async (id, done) => {
  // findBy User
  try {
    const user = connection.query('SELECT * FROM TB_MEMBER WHERE MBR_NB=?', [id]);
    done(null, user);
  } catch (e) {
    done(e, null);
  }
});

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await connection.query('SELECT * FROM TB_MEMBER WHERE MBR_EMAIL=?', [email]);
    //
    if (!user) {
      return done(new Error('이메일이나 패스워드가 잘못되었습니다.'), null);
    }

    let result = null;
    if (user[0].password === password) {
      result = done(null, user[0]);
    } else {
      result = done(new Error('이메일이나 패스워드가 잘못되었습니다.'), null);
    }

    return result;
  } catch (e) {
    return done(e);
  }
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
